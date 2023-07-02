import React from "react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type ModalLayoutProps = {
    children: React.ReactNode,
}

export default function ModalLayout({ children }: ModalLayoutProps) {
    return (
        <>
            {/*Blur background */}
            <div className={`fixed z-[60] inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto ${inter.className}`}>
                <div className={`h-full flex justify-center items-center ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto sm:h-fit`}>
                    <div className="my-auto relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
