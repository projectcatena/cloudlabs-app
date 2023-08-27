import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function VMSettings() {
    
    return(
        <DashboardLayout>
            {/* ========== MAIN CONTENT ========== */}
            {/* Content */}
            <div className="w-full pt-10 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                <div>
                    {/* Page Heading */}
                    <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">Settings</h1>
                    {/* Sub Heading */}
                    <h2 className="block text-2xl font-medium text-gray-800 sm:text-3xl dark:text-gray-300 pt-8">Automatic Shutdown & Disconnect</h2> 
                </div>
                
                {/* Settings */} 
                <form>
                    <div className="grid gap-9">
                        <div className="flex-auto">
                            <div className="flex items-center">
                                <div>
                                    <input type="checkbox" id="idle-check" className="h-6 w-6 md:h-8 md:w-8 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"></input>
                                </div>
                                <label className="ml-3 block text-lg sm:text-xl font-normal text-gray-800 dark:text-gray-400">Shut down idle Virtual Machines</label>
                            </div>

                            <div className="flex pt-3 items-center">
                                <input type="number" defaultValue="15" className="py-3 px-4 w-14 h-10 md:w-20 block border-gray-200 rounded-md text-base focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
                                <label htmlFor="idle" className="ml-3 block text-lg sm:text-xl font-normal text-gray-800 dark:text-gray-400">minutes after idle state is detected</label>
                            </div>

                            <div className="flex pt-3">
                                <select id="idle-reason" className="py-4 px-5 w-full max-w-2xl border-gray-200 rounded-md text-base focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    <option>Detect idle based on user absence and resource usage</option>
                                    <option>Detect idle based on ...</option>
                                </select>
                            </div> 
                        </div>
                        
                        <div className="flex-auto">
                            <div className="flex items-center">
                                <div>
                                    <input type="checkbox" id="disconnected-check" className="h-6 w-6 md:h-8 md:w-8 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"></input>
                                </div>
                                <label className="ml-3 block text-lg sm:text-xl font-normal text-gray-800 dark:text-gray-400">Shut down Virtual Machines when users disconnect</label>
                            </div>

                            <div className="flex pt-3 items-center">
                                <input type="number" defaultValue="0" className="py-3 px-4 w-14 h-10 md:w-20 block border-gray-200 rounded-md text-base focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
                                <label htmlFor="disconnected" className="ml-3 block text-base sm:text-lg font-normal text-gray-800 dark:text-gray-400">minutes after user disconnects</label>
                            </div>
                        </div>

                        <div className="flex-auto">
                            <div className="flex items-center">
                                <div>
                                    <input type="checkbox" id="not-connected-check" className="h-6 w-6 md:h-8 md:w-8 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"></input>
                                </div>
                                <label className="ml-3 block text-lg sm:text-xl font-normal text-gray-800 dark:text-gray-400">Shut down Virtual Machines when users do not connect</label>
                            </div>

                            <div className="flex pt-3 pb-3 items-center">
                                <input type="number" defaultValue="15" className="py-3 px-4 w-14 h-10 md:w-20 block border-gray-200 rounded-md text-base focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
                                <label htmlFor="not-connected" className="ml-3 block text-base sm:text-lg font-normal text-gray-800 dark:text-gray-400">minutes after machine is started</label>
                            </div>
                        </div>  
                    </div>
                    
                </form>
            </div>
        </DashboardLayout>
    )
}