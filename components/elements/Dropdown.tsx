import { useAtom } from "jotai";
import { useState } from "react";
import { snapshotAtom } from "./Atoms/atoms";
import SnapshotModal from "./SnapshotModal";
import StatusModal from "./VirtualMachineStatusModal";


type DropdownProps = {
    instanceName: string
    //snapshotData: [Snapshots]
}

export default function Dropdown({ instanceName }: DropdownProps) {
    const [dropdown, setDropdown] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [snapshotListData, setSnapshotListData] = useAtom(snapshotAtom);

    const [StatusModalOpen, setStatusModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    async function handleDelete() {

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
                throw new Error("Network response failed.");
            }

            const result = await response.json();

            return result;
        } catch (error) {
            console.log("Error:", error);
        }
    }

    async function loadSnapshotData() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/snapshot/list`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            }
        });
        if (!response.ok) {
            throw new Error("Unable to fetch snapshots");
        }
        const return_data = await response.json();
        //setData(return_data);
        //console.log(return_data);
        setSnapshotListData(return_data);
        return return_data;
    }

    async function handleStop() {
        const postData = {
            instanceName,
        };

        try {
            const getStatusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/status`, {
                method: "POST",
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
                setStatusMessage("This Virtual Machine is already terminated!");
                setStatusModalOpen(true);
                return;
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/stop`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error("Network response failed.");
                }

                const result = await response.json();

                return result;
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    async function handleStart() {
        const postData = {
            instanceName,
        };

        try {
            const getStatusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/status`, {
                method: "POST",
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
                setStatusMessage("This Virtual Machine is already running!");
                setStatusModalOpen(true);
                return;
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/start`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error("Network response failed.");
                }

                const result = await response.json();

                return result;
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <div className="hs-dropdown relative inline-flex w-full">
            <button id="hs-dropdown-default" type="button" onClick={() => setDropdown((prev) => !prev)} className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                Actions
                <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
            </button>
            {/* <button id="hs-dropdown-default" type="button" onClick={() => setDropdown((prev) => !prev)} className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                Actions
                <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button> */}
            <div className={`${dropdown ? 'block absolute right-0 top-14' : 'hidden'}`}>
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
                    <button onClick={() => { loadSnapshotData(); setOpenModal((prev) => !prev) }} className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                        Snapshot
                    </button>
                </div>
                {/* Modal */}

                <SnapshotModal open={openModal} onClose={() => setOpenModal((prev) => !prev)} instanceName={instanceName} />
                <StatusModal open={StatusModalOpen} onClose={() => setStatusModalOpen(false)} statusMessage={statusMessage} />

            </div>
        </div>
    )
}
