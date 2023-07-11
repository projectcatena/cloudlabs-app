import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";

const inter = Inter({ subsets: ['latin'] })
type ModalProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    // onClose: (value: boolean) => void
}

const LabPolicyModal = ({open, onClose}: ModalProps) => {
    if (!open) return null;

    return (
        <>

         {/* <!-- Modal --> */}
        <div id="modal-lab-policy" className="hs-overlay w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:duration-500 mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                <h2 className="block text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">Lab Policies</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Policy settings can always be changedafter the lab is created
                </p>
                </div>

                <div className="mt-8 sm:mt-10 divide-y divide-gray-200 dark:divide-gray-700">
                {/* <!-- Form --> */}
                <div className="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                    <form>
                        {/* <!-- Form Field Start --> */}
                        <div className="mb-6">
                            <label htmlFor="lab-hours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Lab hours available to each user outside of scheduled events
                            </label>
                            <input type="number" id="lab-hours" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required></input>
                        </div>
                        {/* <!--Form Field End --> */}
                        {/* <!--Form Field Start--> */}
                        <div className="mb-6">
                            <label htmlFor="connection-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enabled connection types</label>
                            <select name="connection-type" id="connection-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                <option value={"client connection (SSH)"}>Client Connection (SSH)</option>
                                <option value={"server connection (SSL)"}>Server Connection (SSL)</option>
                            </select>
                        </div>
                        {/* <!--Form Field End--> */}
                        {/* <!--Form Field Start--> */}
                        <div className="pb-6">
                            <label htmlFor="shutdown&disconnect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Automatic Shutdown & Disconnect</label>
                            <div className="flex items-center h-5 pb-4 pt-2">
                                <input type="checkbox" id="idle-machine" value={""} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"></input>
                                <label htmlFor="idle-machine" className="block ml-2 text-sm font-medium text-gray-900 dark:text-white">Shutdown idle vitual machines</label>
                            </div>
                            <div className="flex items-center h-5 mb-6">
                                <div className="grid mt-6 grid-cols-4">
                                <input type="number" id="min-after-user-disconnect" className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required></input>
                                <label htmlFor="min-after-user-disconnect" className="col-span-3 block mt-2 ml-2 text-sm font-medium text-gray-900 dark:text-white">Minutes after user disconnects</label>
                                </div>
                            </div>
                        </div>
                        {/* <!--Form Field End--> */}
                        {/* <!--Form Field Start--> */}
                        
                        <div className="pb-6">
                            <div className="flex items-center h-5 pb-4">
                                <input type="checkbox" id="user-disconnect" value={""} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"></input>
                                <label htmlFor="user-disconnect" className="block ml-2 text-sm font-medium text-gray-900 dark:text-white">Shut down virtual machine when users disconnect</label>
                            </div>
                            <div className="flex items-center h-5 mb-6">
                                <div className="grid mt-6 grid-cols-4">
                                <input type="number" id="min-after-user-disconnect" className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required></input>
                                <label htmlFor="min-after-user-disconnect" className="col-span-3 block mt-2 ml-2 text-sm font-medium text-gray-900 dark:text-white">Minutes after user disconnects</label>
                                </div>
                            </div>
                        </div>
                        {/* <!--Form Field End--> */}
                        {/* <!--Form Field Start--> */}
                        <div className="pb-6">
                            <div className="flex items-center h-5 pb-4">
                                <input type="checkbox" id="idle-machine" value={""} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"></input>
                                <label htmlFor="idle-machine" className="block ml-2 text-sm font-medium text-gray-900 dark:text-white">Shut down virtual machine when users do not connect</label>
                            </div>
                            <div className="flex items-center h-5 mb-6">
                                <div className="grid mt-6 grid-cols-4">
                                <input type="number" id="min-after-user-disconnect" className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required></input>
                                <label htmlFor="min-after-user-disconnect" className="col-span-3 block mt-2 ml-2 text-sm font-medium text-gray-900 dark:text-white">Minutes after user disconnects</label>
                                </div>
                            </div>
                        </div>
                        {/* <!--Form Field End--> */}

                    </form>
                </div>
                {/* <!-- End Icon --> */}
                </div>
            </div>

            {/* <!-- Footer --> */}
            <div className="flex justify-end items-center gap-x-2 p-4 sm:px-7 border-t dark:border-gray-700">
                <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications" onClick={() => onClose(!open)}>
                Back
                </button>
                <Link className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
                Next
                </Link>
            </div>
            {/* <!-- End Footer --> */}
            </div>
        </div>
        </div>
        {/* <!-- End Modal -->*/}
        </>
    )
    };
export default LabPolicyModal;