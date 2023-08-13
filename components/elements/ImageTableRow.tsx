import { ImageStatus } from "@/pages/images"
import Link from "next/link"
import { useState } from "react"
import ErrorToast from "./ErrorToast"

type ImageProps = {
    imageId: string,
    imageName: string,
    imageStatus: ImageStatus,
    creationTimestamp: string,
    handleRefresh: () => void
}

const ImageTableRow = (props: ImageProps) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);

        const deleteImageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image/delete`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageName: props.imageName }),
        })
            .finally(() => {
                setIsDeleting(false);
                props.handleRefresh();
            });

        if (!deleteImageResponse.ok) {
            setIsError(true);
            setErrorMessage("Image Deletion Failed");
        }

        const deleteImageResult = await deleteImageResponse.json();
        console.log(deleteImageResult);

        return deleteImageResponse;
    }

    return (
        <tr>
            <td className="h-px w-px whitespace-nowrap">
                <div className="pl-6 py-3">
                    {/* <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                    <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-1" />
                    <span className="sr-only">Checkbox</span>
                    </label> */}
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                    <div className="flex items-center gap-x-3">
                        {/* <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" /> */}
                        <div className="grow">
                            {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageName}</span> */}
                            <span className="block text-sm text-gray-500">{props.imageName}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="h-px w-72 whitespace-nowrap">
                <div className="px-6 py-3">
                    {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageId}</span> */}
                    <span className="block text-sm text-gray-500">{props.imageId}</span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    {
                        (() => {
                            if (ImageStatus[props.imageStatus as unknown as keyof typeof ImageStatus] == ImageStatus.READY) {
                                return (
                                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </svg>
                                        Ready
                                    </span>
                                )
                            } else if (ImageStatus[props.imageStatus as unknown as keyof typeof ImageStatus] == ImageStatus.PENDING) {
                                return (
                                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                        <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                        </svg>
                                        Pending
                                    </span>
                                )
                            } else {
                                return (
                                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                        <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                        Failed
                                    </span>
                                )
                            }
                        })()
                    }
                </div>
            </td>
            {/* <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <div className="flex items-center gap-x-3">
                    <span className="text-xs text-gray-500">1/5</span>
                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                        <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{width: "25%"}}></div>
                    </div>
                    </div>
                </div>
            </td> */}
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    {/* <span className="text-sm text-gray-500">28 Dec, 12:12</span> */}
                    <span className="text-sm text-gray-500">
                        {
                            new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                                .format(Date.parse(props.creationTimestamp))
                        }
                    </span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-1.5">
                    <Link onClick={handleDelete} className={`inline-flex items-center gap-x-1.5 text-sm text-red-500 decoration-2 hover:underline font-medium ${isDeleting ? "hidden" : ""}`} href="#">
                        Delete
                    </Link>
                    <svg className={`animate-spin w-4 h-4 text-white ${isDeleting ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {/* <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                    Edit
                    </Link> */}
                </div>
            </td>
            <td>
                <ErrorToast isOpen={isError} onClose={() => setIsError((prev) => !prev)} errorMessage={errorMessage}></ErrorToast>
            </td>
        </tr>
    )
}

export default ImageTableRow;
