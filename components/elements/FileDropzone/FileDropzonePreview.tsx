import React, {forwardRef} from 'react'

type FilePreviewProps = {
    fileInputEvent: React.ChangeEvent<HTMLInputElement>,
    setFileInputEvent: React.Dispatch<React.SetStateAction<React.ChangeEvent<HTMLInputElement> | undefined>>,
    setIsCancel: React.Dispatch<React.SetStateAction<boolean>>,
    isUpload: boolean,
    now: number
}

const FileDropzonePreview = (props: FilePreviewProps) => {
    const filePreview = props.fileInputEvent.target.files![0];

    return (
        <>
            <div className="py-4 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                <div className={`grid grid-cols-5 ${props.isUpload ? 'mb-1': ''}`}>
                    <span className="max-w-sm truncate col-span-4 text-base font-medium text-blue-700 dark:text-white">{filePreview?.name}</span>
                    <div className="col-span-1 flex space-x-2 justify-end items-center">
                        {
                            props.isUpload ? (
                                <span className="text-sm font-medium text-blue-700 dark:text-white">{props.now}%</span>
                            ) : (
                                <></>
                            )
                        }
                        {/** 
                         * FIXME: State broken, file input set was not removed on setFilePreview() clear
                         */}
                        {/* <button onClick={() => {props.setFilePreview(undefined); }}> */}
                        <button type="button" onClick={() => {props.setFileInputEvent(undefined); props.setIsCancel(true)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                {
                    props.isUpload ? (
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${props.now}%`}}></div>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        </>
    )
};

export default FileDropzonePreview;