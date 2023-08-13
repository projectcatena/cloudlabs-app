import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import ErrorToast from './ErrorToast'

const inter = Inter({ subsets: ['latin'] })

type CreateModuleModalProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    moduleSubtitle: string
    moduleName: string
    moduleDescription: string
}

const CreateModuleModal = ({open, onClose}: CreateModuleModalProps) => {
    const [isError, setIsError] = useState(false);

    const [moduleSubtitle, setSubtitle] = useState("");
    const [moduleName, setName] = useState("");
    const [moduleDescription, setDescription] = useState("");

    /**
     * Handle form submission manually by posting data to the API endpoint.
     * @param event 
     * @returns 
     */
    // Handles the submit event on form submit.
    async function createModule(event: React.SyntheticEvent) {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
     
        // Get data from the form.
        const postData = {
            moduleSubtitle: moduleSubtitle,
            moduleName: moduleName,
            moduleDescription: moduleDescription
        };
        console.log(postData);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Modules/create`, {
                // The method is POST because we are sending data.
                method: "POST",
                // Tell the server we're sending JSON.
                credentials: "include",
                headers: {
                'Content-Type': 'application/json',
                },
                // Body of the request is the JSON data we created above.
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                setIsError(true);
            }

            // Get the response data from server as JSON
            const result = await response.json();
            console.log(result);

            // Reload the page to show the updated module
            window.location.reload();

            // If server returns the module submitted, that means the form works.
            return result;
        } catch (error) {
            console.log("Error:", error);
        }
    }

    if (!open) return null;

    return(
        <div id="add-users" className="fixed z-[60] inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto">
            <div id="add-users" className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <div className="absolute top-2 right-2">
                        <button type="button" onClick={() => {onClose(false);setIsError(false)}} className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-task-created-alert">
                            <span className="sr-only">Close</span>
                            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-10 overflow-y-auto">
                        <div className="mb-6 text-center">
                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                                Add Module
                            </h3>
                            <p className="text-gray-500">
                                Enter the details of the module
                            </p>
                        </div>
                        
                        <form id="create-module-form" onSubmit={createModule}>
                            <div className="space-y-4">
                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="subtitle" className="flex">
                                        <input
                                        onChange={(e) => setSubtitle(e.target.value)}
                                        id="subtitle" name="subtitle"
                                        type="text"
                                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400" 
                                        placeholder="Enter the Module's subtitle"
                                        pattern="^[a-zA-Z0-9 \-]*$"
                                        title='Only alphanumeric characters allowed'
                                        required></input>
                                    </label>
                                </div>

                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="title" className="flex">
                                        <input
                                        onChange={(e) => setName(e.target.value)}
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400"
                                        placeholder="Enter the Module's title"
                                        pattern="^[a-zA-Z0-9_ ]*$"
                                        title='Only alphanumeric characters allowed'
                                        required></input>
                                    </label>
                                </div>
                                
                                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="description" className="flex">
                                        <textarea onChange={(e) => setDescription(e.target.value)}
                                        id="description"
                                        name="description"
                                        placeholder="Enter the Module's description"
                                        className="py-3 px-4 block w-full h-40 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-inherit dark:border-gray-700 dark:text-gray-400"
                                        required></textarea>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end items-center mt-6 gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                                <button type="button" onClick={() => {onClose(false); setIsError(false)}} className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
                                    Cancel
                                </button>
                                <button type="submit" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    Add Module
                                </button>
                            </div>
                        </form> 
                    </div> 
                </div>
            </div>
            <ErrorToast isOpen={isError} onClose={() => setIsError((prev) => !prev)} errorMessage='Module creation has failed'></ErrorToast>
        </div>
    )
};

export default CreateModuleModal;