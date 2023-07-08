import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

type ModalProps = {
    statusMessage: string
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    // onClose: (value: boolean) => void
}

/**
 * Virtual Machine status modal that pop ups with a blured overlay, as well as a button that redirects
 * users back to the previous page when clicked.
 * 
 * @param open
 * @param onClose
 * @param statusMessage
 * @returns 
 */
const StatusModal = ({open, onClose, statusMessage}: ModalProps) => {
    if (!open) return null;

    return (
        <div id="overlay" className="fixed z-[60] inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            {/* hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto */}
            <div id="hs-task-created-alert" className="overflow-x-hidden overflow-y-auto">
                <div className="mt-0 opacity-100 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">

                    <div className="p-4 sm:p-10 text-center overflow-y-auto">
                        {/* Icon */}
                        <span className="mb-4 inline-flex justify-center items-center w-[46px] h-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                        </span>
                        {/* End of Icon */}

                        <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                            Error
                        </h3>
                        <p className="text-gray-500">
                            {statusMessage}
                        </p>

                        <div className="mt-6 flex justify-center gap-x-4">
                            {/* <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> */}
                            <button type="button" onClick={() => onClose(false)} className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-task-created-alert">
                                Close
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StatusModal;