import { Inter } from 'next/font/google';
import React from "react";
import Sidebar from "../modules/sidebar";
import { User } from '@/entity/entity';

const inter = Inter({ subsets: ['latin'] })

type DashboardLayoutProps = {
    children: React.ReactNode,
    user: User,
}

export default function DashboardLayout({ user, children }: DashboardLayoutProps) {

    return (
        <>
            <main
                className={`flex min-h-screen flex-col items-center dark:bg-slate-900 ${inter.className}`}
            >
                <div className="w-full max-w-7xl">
                    <Sidebar username={user.username} email={user.email}></Sidebar>
                    {children}
                </div>
            </main>
        </>
    )
}
