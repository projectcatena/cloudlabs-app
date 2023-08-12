import LoadingModal from '@/components/elements/LoadingModal'
import { Dialog, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import Error from 'next/error'
import { Inter } from 'next/font/google'
import React, { Fragment, useState } from 'react'
import { errorAtom, errorMessageAtom, snapshotAtom } from './Atoms/atoms'
import ErrorToast from './ErrorToast'
import SnapshotTableRow from './SnapshotTableRow'

const inter = Inter({ subsets: ['latin'] })

type SnapshotModalProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    instanceName: string
    //snapshotData: Snapshots[]
}

export type Snapshots = {
    //projectId: string
    //disk_name: string
    id: number
    snapshotName: string
    description: string
    instancename: string
    //region: string
    //location: string
}

const SnapshotModal = ({open, onClose, instanceName}: SnapshotModalProps) => {
    // errors
    const [openErrorModal, setOpenErrorModal] = useAtom(errorAtom);
    const [errorModalMessage, setErrorModalMessage] = useAtom(errorMessageAtom);

    const [snapshotName, setSnapshotName] = useState("");
    const [description, setDescription] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showRevertForm, setShowRevertForm] = useState(false);
    const [showButton, setShowButton] = useState(true);

    // loading modal
    const [openLoadingModal, setOpenLoadingModal] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    // snapshot list
    const [snapshotListData, setSnapshotListData] = useAtom<Snapshots[]>(snapshotAtom);

    function changeButtonState(formType: string) {
        if (formType == "create") {
            setShowCreateForm((prev) => !prev);
            setShowDeleteForm(false);
            setShowRevertForm(false);
        }
        else if (formType == "delete") {
            setShowDeleteForm((prev) => !prev)
            setShowCreateForm(false);
            setShowRevertForm(false);
        }
        else if (formType == "revert") {
            setShowCreateForm(false);
            setShowDeleteForm(false);
            setShowRevertForm((prev) => !prev);
        }
        else {
            setShowCreateForm(false);
            setShowDeleteForm(false);
            setShowRevertForm(false);
        }
        setShowButton((prev) => !prev);
    }

    /**
     * Handle form submission manually by posting data to the API endpoint.
     * @param event
     * @returns
     */
    // Handles the submit event on form submit.
    async function createSnapshot(event: React.SyntheticEvent) {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        setOpenLoadingModal(true);
        setLoadingMessage("Creating...");

        let params = {
            snapshotName,
            instanceName,
            description
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/snapshot/create`, {
                // POST request
                method: "POST",
                credentials: 'include',
                // Tell the server we're sending JSON.
                headers: {
                    "content-type": "application/json",
                    //"Authorization": "Bearer " + localStorage.getItem("token"),
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                // Body of the request is the JSON data we created above.
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                setOpenLoadingModal(false);
                setOpenErrorModal(true);
                setErrorModalMessage("Failed to revert snapshot");
            }

            // Get the response data from server as JSON
            const result = await response.text();
            setOpenLoadingModal(false);
            window.location.reload();
            //alert(`Result: ` + result);
            // If server returns the name submitted, that means the form works.

            return result;
        } catch (error) {
            setOpenErrorModal(true);
            setErrorModalMessage("Failed to create snapshot")
            console.log("Error:", error);
        }
    }

    async function deleteSnapshot(event: React.SyntheticEvent) {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();
        setOpenLoadingModal(true);
        setLoadingMessage("Deleting...");

        let params = {
            snapshotName,
            instanceName,
            };
            
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/snapshot/delete`, {
                // POST request
                method: "DELETE",
                credentials: 'include',
                // Tell the server we're sending JSON.
                headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                },
                // Body of the request is the JSON data we created above.
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                setOpenLoadingModal(false);
                setOpenErrorModal(true);
                setErrorModalMessage("Failed to revert snapshot");
            }

            // Get the response data from server as JSON
            const result = await response.text();
            setOpenLoadingModal(false);
            window.location.reload();
            //alert(`Result: ${JSON.stringify(result)}`);
            // If server returns the name submitted, that means the form works.
            return result;
        } catch (error) {
            setOpenErrorModal(true);
            setErrorModalMessage("Failed to delete snapshot");
            console.log("Error:", error);
        }
    }

    async function revertSnapshot(event: React.SyntheticEvent) {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        setOpenLoadingModal(true);
        setLoadingMessage("Reverting...");

        try {
            let revert_params = { //revert snapshot parameters
                instanceName,
                snapshotName,

                //diskName,
            };

            console.log(revert_params);
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/snapshot/revert`, {
            // POST request
            method: "POST",
            credentials: 'include',
            // Tell the server we're sending JSON.
            headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            },
            // Body of the request is the JSON data we created above.
            body: JSON.stringify(revert_params),
        });

        if (!res.ok) {
            setOpenLoadingModal(false);
            setOpenErrorModal(true);
            setErrorModalMessage("Failed to revert snapshot");
        }

        // Get the response data from server as JSON
        const revert_result = await res.text();
        setOpenLoadingModal(false);
        window.location.reload();
        // If server returns the name submitted, that means the form works.
        return revert_result;
        } catch (error) {
            setOpenLoadingModal(false);
            setOpenErrorModal(true);
            setErrorModalMessage("Failed to revert snapshot");
            console.log("Error:", error);
        }
    }
    //TODO: resolve error when snapshotlist is empty
    if (!snapshotAtom) {
        setOpenErrorModal(true);
        return <Error statusCode={500}/>
    }
    return (
        <>
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => onClose(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-x-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="block text-2xl font-bold text-gray-800 dark:text-white"
                    >
                        Snapshots
                    </Dialog.Title>
                    <div className="mt-2 mb-2">
                        <p className="text-sm text-gray-400">
                        Your Snapshots
                        </p>
                    </div>
                    {/* table/list of snapshots */}
                    {/* Body to show when Empty State */}
                    <div className={`max-w-sm w-full min-h-[300px] flex flex-col justify-center mx-auto px-6 py-4 ${ snapshotListData.length ? "hidden" : "" }`}> {/*  */}
                            <div className="flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800">
                                {/* <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                </svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                        </div>

                            <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
                            No snapshots found
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Snapshots will show when a snapshot had been created
                            </p>
                            <div>
                        </div>
                    </div>
                    {/* End of Body */}
                    {/* Table */}
                    <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${ snapshotListData.length ? "" : "hidden"}`}> {/*  */}
                    <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Name
                            </span>
                        </div>
                        </th>

                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            Description
                                                        </span>
                                                    </div>
                                                </th>

                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            snapshotListData.map((snapshot:Snapshots) => {
                                return(
                                <SnapshotTableRow
                                    key={snapshot.id}
                                    //id={user.id}
                                    name={snapshot.snapshotName}
                                    description={snapshot.description}
                                    //roles={snapshot.roles}
                                    //handleRefresh={handleRefresh}
                                ></SnapshotTableRow>
                                );
                            })
                        }
                    </tbody>
                    </table>
                    {/* End table/list of snapshots */}
                    {/* Create Form */}
                    <div>
                        {showCreateForm && (
                        <form>
                            <div className="space-y-4">
                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                    
                                    <label htmlFor="snapshotName" className="flex">
                                        <input
                                        onChange={(e) => setSnapshotName(e.target.value)}
                                        id="snapshotName"
                                        name="snapshotName"
                                        type="text"
                                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400"
                                        placeholder="Snapshot name"
                                        pattern="^[a-z0-9\-]+$"
                                        title='Please use lowercase alphanumric characters with - instead of space'
                                        required></input>
                                    </label>
                                </div>
                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="diskName" className="flex">
                                        <textarea onChange={(e) => setDescription(e.target.value)} id="diskName" name="diskName" className="py-3 px-4 block w-full h-40 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400" placeholder="Description (Max 150)" maxLength={150} required></textarea>
                                    </label>
                                </div>
                            </div>
                            <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2 mt-4"
                            onClick={createSnapshot} //open hidden form
                            >
                            Create
                            </button>
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2 mt-4"
                            onClick={() => changeButtonState("close")} //close hidden form
                            >
                            Close
                            </button>
                        </form>
                        )}
                    </div>
                    {/* End Create Form */}
                    {/* Delete Form */}
                    <div>
                        {showDeleteForm && (
                        <form>
                            <div className="space-y-4">
                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="snapshotName" className="flex">
                                        <input
                                        onChange={(e) => setSnapshotName(e.target.value)}
                                        id="snapshotName"
                                        name="snapshotName"
                                        type="text"
                                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400"
                                        placeholder="Snapshot name"
                                        pattern="^[a-zA-Z0-9\-]+$"
                                        title='Please use alphanumric characters with - instead of space'
                                        required></input>
                                    </label>
                                </div>
                                {/* 
                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="diskName" className="flex">
                                        <input onChange={(e) => setDescription(e.target.value)} id="diskName" name="diskName" type="text" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400" placeholder="Filter Name"></input>
                                    </label>
                                </div>
                                */}
                            </div>
                            <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2 mt-4"
                            onClick={deleteSnapshot} //open hidden form
                            >
                            Delete
                            </button>
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2 mt-4"
                            onClick={() => changeButtonState("close")} //close hidden form
                            >
                            Close
                            </button>
                        </form>
                        )}
                    </div>
                    {/* End Delete Form */}
                    {/* Revert Form */}
                    <div>
                        {showRevertForm && (
                        <form>
                            <div className="space-y-4">
                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="snapshotName" className="flex">
                                        <input
                                        onChange={(e) => setSnapshotName(e.target.value)}
                                        id="snapshotName"
                                        name="snapshotName"
                                        type="text"
                                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400"
                                        placeholder="Snapshot name"
                                        pattern="^[a-zA-Z0-9\-]+$"
                                        title='Please use alphanumric characters with - instead of space'
                                        required></input>
                                    </label>
                                </div>
                            </div>
                            <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2 mt-4"
                            onClick={revertSnapshot} //open hidden form
                            >
                            Revert
                            </button>
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2 mt-4"
                            onClick={() => changeButtonState("close")} //close hidden form
                            >
                            Close
                            </button>
                        </form>
                        )}
                    </div>
                    {/* End Revert Form */}

                    {showButton && (
                    <div className="mt-4">
                        
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                        onClick={() => changeButtonState("create")} //open hidden form
                        >
                        New Snapshot
                        </button>
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                        onClick={() => changeButtonState("delete")}
                        >
                        Delete
                        </button>
                        <button type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                        onClick={() => changeButtonState("revert")}
                        >
                        Revert
                        </button>
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                        onClick={() => onClose(false)}
                        >
                        Close
                        </button>
                        
                    </div>
                    )}
                    </Dialog.Panel>
                </Transition.Child>
                </div>
                {/* Modal */}
                {openLoadingModal && (
                <LoadingModal
                    open={openLoadingModal}
                    onClose={() => setOpenLoadingModal((prev) => !prev)}
                    loadingState={loadingMessage}
                    />
                    )}
                
                <ErrorToast isOpen={openErrorModal} onClose={() => setOpenErrorModal((prev) => !prev)} errorMessage={errorModalMessage}></ErrorToast>
            </div>
            </Dialog>
        </Transition>
        </>
    )
};

export default SnapshotModal;
