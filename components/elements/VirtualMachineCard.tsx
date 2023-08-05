import Dropdown from './Dropdown'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { ComputeInstance } from '@/pages/module'

const inter = Inter({ subsets: ['latin'] })

type VirtualMachineCardProps = {
    computeInstance: ComputeInstance
}

export default function VirtualMachineCard({ computeInstance }: VirtualMachineCardProps) {
    return (
        <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="h-16 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl"></div>
            <div className="p-4 md:p-6">
                <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                    {computeInstance.machineType.name}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                    {computeInstance.instanceName}
                </h3>
                <p className="mt-3 text-gray-500">
                    {computeInstance.address.privateIPv4Address}
                    {/* Kali Linux is an open-source, Debian-based Linux distribution geared towards various information security tasks.  */}
                </p>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700 z-0">
                <Link
                    href={{
                        pathname: '/console',
                        query: {
                            instance: computeInstance.instanceName
                        }
                    }}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                    View Console
                </Link>
                <Dropdown instanceName={computeInstance.instanceName}></Dropdown>
            </div>
        </div>
    )
}
