import React, { useState } from 'react'
import FileDropzone from './FileDropzone/FileDropzone'
import FileDropzonePreview from './FileDropzone/FileDropzonePreview'

type SignedURLResult = {
    status: string,
    signedURL: string
}

type ModalProps = {
    open: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    // onClose: (value: boolean) => void
}

async function getSignedUploadURL(fileName: string) {
    // Get Signed URL for Upload
    const signedURLResponse = await fetch("http://localhost:8080/storage/signed", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({objectName: fileName}),
    });


    if (!signedURLResponse.ok) {
        throw new Error("Network response failed.");
    }

    const signedURLResult: SignedURLResult = await signedURLResponse.json();

    return signedURLResult.signedURL;
}

const AddImageModal = ({open, onClose}: ModalProps) => {
    const [fileSelected, setFileSelected] = useState<File>();
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [progress, setProgress] = useState(0);

    /**
     * Handle form submission manually by posting data to the API endpoint.
     * @param event 
     * @returns 
     */
    async function handleFormSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        setIsFileUpload(true);

        // Obtain GCP signed URL for upload
        const signedURL = await getSignedUploadURL(fileSelected!.name);
        console.log(signedURL);

        const formData = new FormData();
        formData.append("file", fileSelected as Blob)

        console.log(formData);

        const xhr = new XMLHttpRequest();
        const success = await new Promise((resolve) => {
            xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                    console.log("upload progress:", (100 * event.loaded) / event.total);
                    setProgress(Math.round((100 * event.loaded) / event.total))
                }
            });
            xhr.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                    console.log("download progress:", event.loaded / event.total);
                }
            });
            xhr.addEventListener("loadend", () => {
                resolve(xhr.readyState === 4 && xhr.status === 200);
            });
            xhr.open("PUT", signedURL, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.send(formData);
        });
        console.log("success:", success);
        if (success) {
            setIsFileUpload(false);
        }

        // fetch() does not support progression visibility
        // try {
        //     const response = await fetch("http://localhost:8080/storage/upload", {
        //         method: "POST",
        //         // Do not set Content-Type header, browser will set automatically
        //         // with the boundary parameter.
        //         // headers: {
        //         //     "Content-Type": "multipart/form-data",
        //         // },
        //         body: formData,
        //     });


        //     if (!response.ok) {
        //         throw new Error("Network response failed.");
        //     }

        //     const result = await response.json();
        //     return result;
        // } catch (error) {
        //     console.log("Error:", error);
        // }
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
                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-10">
                        <div className="mb-6 text-center">
                        <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                            Upload Image
                        </h3>
                        <p className="text-gray-500">
                            Upload a virtual disk (VMDK, or VMDH) to be processed into an image that can be used as a boot disk.
                        </p>
                        </div>

                        <div className="space-y-4">
                             {/* Form */}
                            <form id="createVirtualMachineForm" onSubmit={handleFormSubmit}>
                                <div className="grid gap-y-4">
                                    {/* Form Group */}
                                    {/* <div>
                                        <label htmlFor="name" className="block text-sm mb-2 dark:text-white">Name</label>
                                        <div className="relative">
                                            <input onChange={(e) => setName(e.target.value)} placeholder="image-1" type="text" id="name" name="name" className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                    </div> */}
                                    {/* End Form Group */}
                                    <FileDropzone file={fileSelected} setFile={setFileSelected}></FileDropzone>
                                    {
                                        fileSelected ? (
                                            <FileDropzonePreview isUpload={isFileUpload} filePreview={fileSelected} setFilePreview={setFileSelected} now={progress}></FileDropzonePreview>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {/* Form Group */}
                                    {/* <label htmlFor="af-submit-app-upload-images" className="inline-block text-sm font-medium text-gray-800 dark:text-gray-200">
                                    Preview image
                                    </label> */}
                                    {/* <div className="space-y-2">

                                        <label htmlFor="af-submit-app-upload-images" className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700">
                                            <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" className="sr-only" />
                                            <svg className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                            </svg>
                                            <span className="mt-2 block text-sm text-gray-800 dark:text-gray-200">
                                                Browse your device or <span className="group-hover:text-blue-700 text-blue-600">drag 'n drop'</span>
                                            </span>
                                            <span className="mt-1 block text-xs text-gray-500">
                                                Maximum file size is 2 MB
                                            </span>
                                        </label>
                                    </div> */}
                                    
                                    {/* End of Form Group */}

                                    {/* Original File Form Group */}
                                    {/* <div className="py-4 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-base font-medium text-blue-700 dark:text-white">parrot-security.vmdk</span>
                                            <span className="text-sm font-medium text-blue-700 dark:text-white">45%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "45%"}}></div>
                                        </div>
                                    </div> */}
                                    {/* End of Form Group */}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                        <button type="button" onClick={() => onClose(false)} className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
                            Cancel
                        </button>
                        <button type="submit" form='createVirtualMachineForm' className="w-24 h-10 py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isFileUpload}>
                            <svg className={`animate-spin h-4 w-4 text-white ${isFileUpload ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className={`${ isFileUpload ? "hidden" : ""}`}>
                                Upload
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddImageModal;