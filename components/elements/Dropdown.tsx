import { useAtom } from "jotai";
import { useState } from "react";
import { errorAtom, errorMessageAtom, snapshotAtom } from "./Atoms/atoms";
import ErrorToast from "./ErrorToast";
import LoadingModal from "./LoadingModal";
import SnapshotModal from "./SnapshotModal";
import StatusModal from "./VirtualMachineStatusModal";


type DropdownProps = {
    instanceName: string
    //snapshotData: [Snapshots]
}

export default function Dropdown({ instanceName }: DropdownProps) {
    // Error atom
    const [snapshotError, setSnapshotError] = useAtom(errorAtom);
    const [snapshotErrorMessage, setSnapshotErrorMessage] = useAtom(errorMessageAtom);

    // Error useState()
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [dropdown, setDropdown] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [snapshotListData, setSnapshotListData] = useAtom(snapshotAtom);

    const [StatusModalOpen, setStatusModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    // Loading State
    const [openLoadingModal, setOpenLoadingModal] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    console.log(openModal)

    async function handleDelete() {
        setOpenLoadingModal(true);
        setLoadingMessage("Deleting...");

        const postData = {
            instanceName,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/delete`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                body: JSON.stringify(postData),
            });


            if (!response.ok) {
                throw new Error("Network Failed")
            }

            const result = await response.json();
            setIsError(false);
            setOpenLoadingModal(false);
            window.location.reload();

            return result;
        } catch (error) {
            setOpenLoadingModal(false);
            setIsError(true);
            setErrorMessage("Failed to delete Virtual Machine");
            console.log("Error:", error);
        }
    }

    async function loadSnapshotData() {
        try {
            let data = {
                instanceName,
            };
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/snapshot/list`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to retrieve snapshot list");
            }
            const return_data = await response.json();
            setIsError(false);
            setSnapshotListData(return_data);
            setSnapshotError(false);
            return return_data;
        } catch (error) {
            setSnapshotError(true);
            setSnapshotErrorMessage("Unable to retrieve snapshots");
        }
    }

    async function handleStop() {
        setOpenLoadingModal(true);
        setLoadingMessage("Stopping...");

        const postData = {
            instanceName,
        };

        try {
            const getStatusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/status`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!getStatusResponse.ok) {
                throw new Error("Network response failed.");
            }

            const statusResult = await getStatusResponse.json();

            if (statusResult.status === "TERMINATED") {
                setOpenLoadingModal(false);
                setStatusMessage("This Virtual Machine is already terminated!");
                setStatusModalOpen(true);
                return;
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/stop`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error("Network response failed.");
                }

                const result = await response.json();
                setIsError(false);
                setOpenLoadingModal(false);
                window.location.reload();

                return result;
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage("Failed to stop Virtual Machine");
            setOpenLoadingModal(false);
            console.log("Error:", error);
        }
    }

    async function handleStart() {
        setOpenLoadingModal(true);
        setLoadingMessage("Starting...");

        const postData = {
            instanceName,
        };

        try {
            const getStatusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/status`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!getStatusResponse.ok) {
                throw new Error("Network response failed.");
            }

            const statusResult = await getStatusResponse.json();

            if (statusResult.status === "RUNNING") {
                setOpenLoadingModal(false);
                setStatusMessage("This Virtual Machine is already running!");
                setStatusModalOpen(true);
                return;
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/start`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error("Network response failed.");
                }

                const result = await response.json();
                setIsError(false);
                setOpenLoadingModal(false);
                window.location.reload();

                return result;
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage("Failed to start Virtual Machine");
            setOpenLoadingModal(false);
            console.log("Error:", error);
        }
    }

    return (
        <div className="hs-dropdown relative inline-flex w-full">
            <button id="hs-dropdown-default" type="button" onClick={() => setDropdown((prev) => !prev)} className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                Actions
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${dropdown ? "hidden" : ""} w-4 h-4`}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg> {/* down arrow */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${dropdown ? "" : "hidden"} w-4 h-4`}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg> {/* up arrow */}
            </button>
            <div className={`${dropdown ? 'block absolute right-0 bottom-16' : 'hidden'}`}>
                <div className="transition-[opacity,margin] duration-[0.1ms] z-50 w-72 z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700" aria-labelledby="hs-dropdown-default">
                    <button onClick={handleStart} className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                        Start
                    </button>
                    <button onClick={handleStop} className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                        Stop
                    </button>
                    <button onClick={handleDelete} className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                        Destroy
                    </button>
                    <button onClick={() => { loadSnapshotData(); setOpenModal((prev) => !prev)}} className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"> {/* ; setDropdown((prev) => !prev) */}
                        Snapshot
                    </button>
                </div>
            </div>
            {/* Modal */}
            {openLoadingModal && (
                <LoadingModal
                open={openLoadingModal}
                onClose={() => setOpenLoadingModal((prev) => !prev)}
                loadingState={loadingMessage} />
            )}
            <SnapshotModal open={openModal} onClose={() => setOpenModal((prev) => !prev)} instanceName={instanceName} />
            <StatusModal open={StatusModalOpen} onClose={() => setStatusModalOpen(false)} statusMessage={statusMessage} />
            <ErrorToast isOpen={isError} onClose={() => setIsError((prev) => !prev)} errorMessage={errorMessage}></ErrorToast>
        </div>

    )
}
