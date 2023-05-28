
import { RSC_MODULE_TYPES } from 'next/dist/shared/lib/constants'
import { Inter } from 'next/font/google'
import React, { useState, FormEventHandler } from 'react'
import { Type } from 'typescript'

const inter = Inter({ subsets: ['latin'] })

export interface Image {
    name: string
    project: string
}

export interface InstanceType {
    name: string
}

type ModalProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    // onClose: (value: boolean) => void
    imageOptions: Image[]
    instanceTypes: InstanceType[]
}

const CreateVirtualMachineModal = ({open, onClose, imageOptions, instanceTypes}: ModalProps) => {
    if (!open) return null;

    const [name, setName] = useState("");
    const [selectedImage, setSelectedImage] = useState({ name: "", project: "" });
    const [selectedInstanceType, setSelectedInstanceType] = useState({ name: "" });

    /**
     * Handle form submission manually by posting data to the API endpoint.
     * @param event 
     * @returns 
     */
    async function createVirtualMachine(event: React.SyntheticEvent) {
        event.preventDefault();

        const postData = { name, selectedImage, selectedInstanceType };
        console.log(postData);

        try {

            const response = await fetch("http://localhost:8080/api/compute/create", {
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
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <div id="hs-notifications" className="fixed z-[60] inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <div className="absolute top-2 right-2">
                        <button type="button" onClick={() => onClose(false)} className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
                            <span className="sr-only">Close</span>
                            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-10 overflow-y-auto">
                        <div className="mb-6 text-center">
                        <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                            Create a Virtual Machine Template
                        </h3>
                        <p className="text-gray-500">
                            Creating a template virtual machine enables you to customize the content of the virtual machines in the lab.
                        </p>
                        </div>

                        <div className="space-y-4">
                             {/* Form */}
                            <form id="createVirtualMachineForm" onSubmit={createVirtualMachine}>
                                <div className="grid gap-y-4">
                                    {/* Form Group */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm mb-2 dark:text-white">Name</label>
                                        <div className="relative">
                                            <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                    </div>
                                    {/* End Form Group */}

                                    {/* Form Group */}
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="image" className="block text-sm mb-2 dark:text-white">Image</label>
                                        </div>
                                        <div className="relative">
                                            {/* <select id="af-submit-app-category" className="py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"> */}
                                            <select onChange={e => setSelectedImage(imageOptions[e.target.value as unknown as number])} id='image' name='image' className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                                <option selected>Select a machine image</option>
                                                {imageOptions.map((image, index) => {
                                                    return (
                                                        <option key={index} value={index}>{image.name}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                    </div>
                                    {/* End Form Group */}
                                    {/* Form Group */}
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="instance" className="block text-sm mb-2 dark:text-white">Instance Type</label>
                                        </div>
                                        <div className="relative">
                                            {/* <select id="af-submit-app-category" className="py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"> */}
                                            <select onChange={e => setSelectedInstanceType(instanceTypes[e.target.value as unknown as number])} id='instance' name='instance' className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                                <option selected>Select an instance type</option>
                                                {instanceTypes.map((instance, index) => {
                                                    return (
                                                        <option key={index} value={index}>{instance.name}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                    </div>
                                    {/* End Form Group */}
                                </div>
                            </form>
                            {/* Card */}
                            {/* <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="hs-meetups-near-you" className="flex p-4 md:p-5">
                                <span className="flex mr-5">
                                    <svg className="flex-shrink-0 mt-1 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                                    </svg>

                                    <span className="ml-5">
                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Meetups Near You</span>
                                    <span className="block text-sm text-gray-500">Get an email when a Preline Meetup is posted close to my location</span>
                                    </span>
                                </span>

                                <input type="checkbox" id="hs-meetups-near-you" className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200" />
                                </label>
                            </div> */}
                            {/* End Card */}

                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                        <button type="button" onClick={() => onClose(false)} className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
                            Cancel
                        </button>
                        <button type="submit" form='createVirtualMachineForm' className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreateVirtualMachineModal;