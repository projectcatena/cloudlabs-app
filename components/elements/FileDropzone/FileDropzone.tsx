import { Inter } from 'next/font/google'
import FileDropzonePreview from './FileDropzonePreview'
import React from 'react'

type FileProps = {
    file: File | undefined,
    setFile: React.Dispatch<React.SetStateAction<File | undefined>> 
}

const FileDropzone = ({file, setFile}: FileProps) => {
    // const handleFileDropzoneOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     setFile(e.target.files![0]);
    // }

    return (
        <>
            <div className="space-y-2">
                {/* <label htmlFor="af-submit-app-upload-images" className="inline-block text-sm font-medium text-gray-800 dark:text-gray-200">
                Preview image
                </label> */}

                <label htmlFor="af-submit-app-upload-images" className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700">
                    <input onChange={(e) => setFile(e.target.files![0])} id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" className="sr-only" />
                    {/* <input onChange={handleFileDropzoneOnChange} id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" className="sr-only" /> */}
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
            </div>
        </>
    )
}

export default FileDropzone;