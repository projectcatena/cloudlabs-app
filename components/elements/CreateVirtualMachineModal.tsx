
import { Combobox, Listbox } from '@headlessui/react'
import { Inter } from 'next/font/google'
import React, { useDeferredValue, useEffect, useState } from 'react'
import ErrorToast from './ErrorToast'
import CreateSubnetModal from '@/components/elements/CreateSubnetModal';
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export interface SourceImage {
    imageId?: string
    imageName?: string
    imageProject?: string // Can be optional as if user use own image, no need specify project
    imageStatus?: string
    creationTimestamp?: string
}

export interface MachineType {
    name: string
}

export interface Subnet {
    id?: number
    subnetName?: string
}

type ModalProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateVirtualMachineModal = ({ open, onClose }: ModalProps) => {
    const [instanceName, setInstanceName] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [isPublicImageChecked, setPublicImageChecked] = useState(false);
    const [isMaxRunDurationChecked, setMaxRunDurationChecked] = useState(false);
    const [startupScript, setStartupScript] = useState("");

    // Source Image
    const [sourceImage, setSourceImage] = useState<SourceImage>();
    const [sourceImageData, setSourceImageData] = useState<SourceImage[]>();

    // Max runtime
    const [maxRunDuration, setMaxRunDuration] = useState("");

    // Subnet
    const [subnet, setSubnet] = useState<Subnet>();
    const [subnetData, setSubnetData] = useState<Subnet[]>();

    // Machine Type Input
    const [machineTypeQuery, setMachineTypeQuery] = useState("");
    const [machineType, setMachineType] = useState<MachineType>();
    const [machineTypeData, setMachineTypeData] = useState<MachineType[]>();
    const deferredMachineTypesQuery = useDeferredValue(machineTypeQuery);

    // Event States
    const [isError, setIsError] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(
        () => {
            if (deferredMachineTypesQuery != "") {
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/list-machine-types?query=${deferredMachineTypesQuery}`, {
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                    }
                })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        throw res;
                    })
                    .then(data => {
                        setMachineTypeData(data);
                    })
                    .catch(error => {
                        console.error("Error: ", error);
                        setIsError(true);
                        setIsCreating(false);
                    })
                    .finally(() => {
                        setIsCreating(false);
                    })
            }
        },
        [deferredMachineTypesQuery]
    )

    useEffect(
        () => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image/list`, {
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw res;
                })
                .then(data => {
                    setSourceImageData(data);
                })
                .catch(error => {
                    console.error("Error: ", error);
                    setIsError(true);
                })
                .finally(() => {
                    // setIsLoading(false);
                })
        },
        [sourceImage]
    )

    useEffect(
        () => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/network/list`, {
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw res;
                })
                .then(data => {
                    setSubnetData(data);
                })
                .catch(error => {
                    console.error("Error: ", error);
                    setIsError(true);
                })
                .finally(() => {
                    // setIsLoading(false);
                })
        },
        [subnet]
    )

    useEffect(
        () => {
            if (isError) {
                setTimeout(() => {
                    setIsError(false);
                }, 5000);
            }
        },
        [isError] // Run only when errorToastOpen changes
    )

    /**
     * Handle form submission manually by posting data to the API endpoint.
     * @param event 
     * @returns 
     */
    async function createVirtualMachine(event: React.SyntheticEvent) {
        event.preventDefault();

        setIsCreating(true);

        const postData = {
            instanceName,
            sourceImage: {
                name: sourceImage?.imageName,
                project: sourceImage?.imageProject
            },
            machineType,
            startupScript,
            maxRunDuration
        };
        console.log(postData);

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/compute/create`, {
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
                setIsError(true);
                // throw new Error("Network response failed.");
            }

            setIsCreating(false);

            const result = await response.json();

            return result;

        } catch (error) {
            console.log("Error:", error);
        }
    }

    if (!open) return null;

    return (
        <div id="hs-notifications" className="fixed z-[60] inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto">
            <div className={`h-full flex justify-center items-center ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto sm:h-fit`}>
                <div className="my-auto relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <div className="absolute top-2 right-2">
                        <button type="button" onClick={() => onClose(false)} className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
                            <span className="sr-only">Close</span>
                            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-10">
                        <div className="mb-6 text-center">
                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                                Create a Virtual Machine
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
                                            <input onChange={(e) => setInstanceName(e.target.value)} placeholder="instance-1" type="text" id="name" name="name" className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
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

                                        <div className='space-y-2'>
                                            {/* Card */}
                                            <div className="z-10 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                                <label htmlFor="public-image-checkbox" className="flex p-4 md:p-5">
                                                    <span className="flex mr-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" stroke-width="1.5" stroke="currentColor" className="flex-shrink-0 mt-1 w-5 h-5 text-gray-500">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                                                        </svg>

                                                        <span className="ml-5">
                                                            <span className="block font-medium text-gray-800 dark:text-gray-200">Public Image</span>
                                                            <span className="block text-sm text-gray-500">Use a publicly available image on the GCP marketplace.</span>
                                                        </span>
                                                    </span>

                                                    <input checked={isPublicImageChecked} onChange={() => setPublicImageChecked(!isPublicImageChecked)} type="checkbox" id="public-image-checkbox" className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200" />
                                                </label>
                                            </div>
                                            {/* End Card */}

                                            <div className="relative">
                                                {
                                                    isPublicImageChecked ?
                                                        <div className='space-y-2'>
                                                            <div className="relative">
                                                                <input onChange={(e) => setSourceImage(sourceImage => ({ ...sourceImage, imageName: e.target.value }))} placeholder="Image Name (e.g. debian-11)" type="text" id="name" name="name" className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                                    <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                                    </svg>
                                                                </div>
                                                            </div>

                                                            <div className="relative">
                                                                <input onChange={(e) => setSourceImage(sourceImage => ({ ...sourceImage, imageProject: e.target.value }))} placeholder="Project (e.g. debian-cloud)" type="text" id="name" name="name" className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                                    <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <Listbox value={sourceImage} onChange={setSourceImage}>
                                                            {/* relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm */}
                                                            <Listbox.Button className="relative cursor-default text-left py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                                                {sourceImage?.imageName || "Select an image"}
                                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                    </svg>
                                                                </span>
                                                            </Listbox.Button>
                                                            <Listbox.Options className="border-gray-200 absolute z-[60] mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-700">
                                                                {sourceImageData?.map((image: SourceImage) => (
                                                                    <Listbox.Option
                                                                        key={image.imageId}
                                                                        value={image}
                                                                        className={({ active }) =>
                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-500 text-white' : 'text-gray-400'
                                                                            }`
                                                                        }
                                                                    >
                                                                        {image.imageName}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Listbox>
                                                }
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>

                                        </div>

                                    </div>
                                    {/* End Form Group */}
                                    {/* Form Group */}
                                    <div className='z-40'>
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="instance" className="block text-sm mb-2 dark:text-white">Instance Type</label>
                                        </div>
                                        <div className="relative">
                                            <Combobox value={machineType || ""} onChange={setMachineType}>
                                                <Combobox.Input displayValue={(selected: MachineType) => selected.name} autoComplete="off" onChange={(event) => setMachineTypeQuery(event.target.value)} className="relative py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" />
                                                <Combobox.Options className="border-gray-200 absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-700">
                                                    {machineTypeData?.slice(0, 5).map((machineType) => (
                                                        <Combobox.Option
                                                            key={machineType.name}
                                                            value={machineType}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-500 text-white' : 'text-gray-400'
                                                                }`
                                                            }
                                                        >
                                                            {machineType.name}
                                                        </Combobox.Option>
                                                    ))}
                                                </Combobox.Options>
                                            </Combobox>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                    </div>
                                    {/* End Form Group */}
                                    {/* Form Group */}
                                    <div>
                                        <div className="relative">
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="image" className="block text-sm mb-2 dark:text-white">Subnet</label>
                                            </div>

                                            <Listbox value={subnet} onChange={setSubnet}>
                                                {/* relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm */}
                                                <Listbox.Button className="relative cursor-default text-left py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                                    {subnet?.subnetName || "Select a subnet"}
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </span>
                                                </Listbox.Button>
                                                <Listbox.Options className="border-gray-200 absolute z-[60] mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-700">
                                                    {subnetData?.map((subnet: Subnet) => (
                                                        <Listbox.Option
                                                            key={subnet.id}
                                                            value={subnet}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-500 text-white' : 'text-gray-400'
                                                                }`
                                                            }
                                                        >
                                                            {subnet.subnetName}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Listbox>
                                        </div>
                                        <div className="mt-2 text-sm flex">
                                            <span className="cursor-pointer">
                                                No subnet?{' '}
                                                <Link
                                                    className="text-blue-500 underline" href="/subnets"
                                                >
                                                    Create a new subnet
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                    {/* End Form Group */}
                                    {/* Card */}
                                    <div className="z-10 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="startup-script-checkbox" className="flex p-4 md:p-5">
                                            <span className="flex mr-5">
                                                {/* <svg className="flex-shrink-0 mt-1 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                                                </svg> */}

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" stroke-width="1.5" stroke="currentColor" className="flex-shrink-0 mt-1 w-5 h-5 text-gray-500">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                                                </svg>

                                                <span className="ml-5">
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Startup Script</span>
                                                    <span className="block text-sm text-gray-500">Add a custom shell script such as bash or powershell that runs on startup.</span>
                                                </span>
                                            </span>

                                            <input checked={isChecked} onChange={() => setChecked(!isChecked)} type="checkbox" id="startup-script-checkbox" className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200" />
                                        </label>
                                    </div>
                                    {/* End Card */}
                                    {/* Form Group */}
                                    {
                                        isChecked && (
                                            <div>
                                                <label htmlFor="startup-script" className="block text-sm mb-2 dark:text-white">Startup Script</label>
                                                <div className="relative">
                                                    {/* <input onChange={(e) => setName(e.target.value)} placeholder="instance-1" type="text" id="name" name="name" className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" /> */}
                                                    <textarea onChange={(e) => setStartupScript(e.target.value)} id="startup-script" name='startup-script' rows={4} className='py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'></textarea>
                                                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                            </div>
                                        )
                                    }
                                    {/* End Form Group */}
                                    {/* Card */}
                                    <div className="z-10 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="max-runtime-checkbox" className="flex p-4 md:p-5">
                                            <span className="flex mr-5">
                                                {/* <svg className="flex-shrink-0 mt-1 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                                                </svg> */}

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" stroke-width="1.5" stroke="currentColor" className="flex-shrink-0 mt-1 w-5 h-5 text-gray-500">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                                                </svg>

                                                <span className="ml-5">
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Limit Instance Runtime</span>
                                                    <span className="block text-sm text-gray-500">Automatically stop the instance after a duration (minimum 120 seconds).</span>
                                                </span>
                                            </span>

                                            <input checked={isMaxRunDurationChecked} onChange={() => setMaxRunDurationChecked(!isMaxRunDurationChecked)} type="checkbox" id="max-runtime-checkbox" className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200" />
                                        </label>
                                    </div>
                                    {/* End Card */}
                                    {/* Form Group */}
                                    {
                                        isMaxRunDurationChecked && (
                                            <div>
                                                <label htmlFor="startup-script" className="block text-sm mb-2 dark:text-white">Max Runtime Duration (in seconds)</label>
                                                <div className="relative">
                                                    <input onChange={(e) => setMaxRunDuration(e.target.value)} placeholder="120" type="text" id="name" name="name" className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                            </div>
                                        )
                                    }
                                    {/* End Form Group */}

                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                        <button type="button" onClick={() => onClose(false)} className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
                            Cancel
                        </button>
                        <button type="submit" form='createVirtualMachineForm' className="w-24 h-10 py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isCreating}>
                            <svg className={`animate-spin h-4 w-4 text-white ${isCreating ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className={`${isCreating ? "hidden" : ""}`}>
                                Create
                            </span>
                        </button>
                        {/* <button type="submit" form='createVirtualMachineForm' className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Create
                        </button> */}
                    </div>
                </div>
            </div>
            <ErrorToast errorMessage="Virtual machine creation has failed." isOpen={isError}></ErrorToast>
        </div>
    )
};

export default CreateVirtualMachineModal;
