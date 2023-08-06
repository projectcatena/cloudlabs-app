    import React, { useState, useEffect } from "react";
    import Guacamole from 'guacamole-common-js'
    import Link from "next/link";
    import RestartingModal from '@/components/elements/RestartingModal'
    import { useRouter } from 'next/router';

    type Props = {
        //keyboard: Guacamole.Keyboard;
        instanceName: string;
    }

    export default function ConsoleBar({ instanceName } : Props) {

        const router = useRouter();
        const [openRestartingModal, setOpenRestartingModal] = useState(false);

        // TODO: Send Ctrl + Alt + Del signal to guest
        async function handleRestart() {
            // https://guacamole.apache.org/doc/guacamole-common-js/main_webapp_modules_Keyboard.js.html
            // keyboard.press(17);
            // keyboard.press(18);
            // keyboard.press(46);
            // keyboard.reset();
            // console.log(keyboard);

            setOpenRestartingModal(true);

            const postData = {
                instanceName
            };
            try{
                const response = await fetch("http://localhost:8080/api/compute/reset", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error("Network response failed.");
                }

                const result = await response.json();

                setOpenRestartingModal(false);

                router.push('/module').then(() => {
                    // Reload the page after navigation
                    window.location.reload();
                  });

                return result;
            } catch (error) {
                console.log("Error:", error);
            }
        }

        return (
            <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-3 sm:py-0 dark:bg-slate-900">
                <nav className="relative w-full mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8" aria-label="Global">
                    <div className="flex items-center justify-between">
                        <Link className="flex-none text-3xl font-semibold dark:text-white" href="/" aria-label="Brand">Cloud<span className="text-blue-600">Labs</span></Link>
                    </div>
                    <div className="flex gap-y-4 gap-x-0 flex-row items-center justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
                        {/* flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 */}
                        <button onClick={handleRestart} className="sm:my-4 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            Restart
                        </button>
                    </div>
                </nav>

                {/* Restarting Modal */}
                {openRestartingModal && (
                    <RestartingModal
                        open={openRestartingModal}
                        onClose={() => setOpenRestartingModal(false)}
                    />
                )}
            </header>
        )
    }
