import React from "react";
import Sidebar from "../modules/sidebar";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type DashboardLayoutProps = {
    children: React.ReactNode,
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <>
            <main
            className={`flex min-h-screen flex-col items-center dark:bg-slate-900 ${inter.className}`}
            >
                <div className="w-full max-w-7xl">
                    <Sidebar></Sidebar>
                    {children}
                </div>
            </main>
        </>
    )
}