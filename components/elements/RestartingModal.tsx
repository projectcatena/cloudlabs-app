import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

type ModalProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    // onClose: (value: boolean) => void
}

const RestartingModal = ({open, onClose}: ModalProps) => {
    if (!open) return null;

    return (
        <div id="overlay" className="fixed z-[60] inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            {/* hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto */}
            <div id="hs-task-created-alert" className="overflow-x-hidden overflow-y-auto">
                <div className="mt-0 opacity-100 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">

                        <div className="p-4 sm:p-10 text-center overflow-y-auto">
                            {/* Icon */}
                            <div className="mb-4 inline-flex justify-center items-center w-[46px] h-[46px]">
                                <svg className="animate-spin h-8 w-8 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            {/* End of Icon */}

                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                                Restarting...
                            </h3>
                            <p className="text-gray-500">
                                This will take a while.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RestartingModal;