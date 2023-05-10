import Head from "next/head";
import Link from "next/link";
import React from "react";

//Login Page -- Tristan
export default function Login() {
    return (
        <>
        {/*Login Page Header*/}
        <div>
            <Head>
                <title>Login Page</title>
                <script src="./assets/vendor/preline/dist/preline.js"></script>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
            </Head>
        </div>
            
        {/*Starting of grid*/}
        <main>
        <div className="grid grid-cols-2 content-center p-8">
            {/*Left side of page*/}
            <div className="w-full max-w-md mx-auto p-6">
                {/*Apply tailwind on h1 & h2*/}
                <h1 className="text-sky-400">CloudLabs</h1>
                <h2>Cloud-based Computing labs for Academia</h2>
                
                <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account yet?
                        <a className="text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/signup.html">
                            Sign up here
                        </a>
                        </p>
                    </div>
                    <div className="mt-5">
                        {/*Google Sign in button*/}
                        <div id="g_id_onload"
                            data-client_id="1006867201908-kf5ss0r59q0usej0chepa5jurdve9cf6.apps.googleusercontent.com"
                            data-context="signin"
                            data-ux_mode="popup"
                            data-callback="onLogin"
                            data-auto_prompt="false">
                        </div>

                        <div id="g_id_signin "
                            data-type="standard"
                            data-shape="rectangular"
                            data-theme="outline"
                            data-text="signin_with"
                            data-size="large"
                            data-logo_alignment="left">
                        </div>
                        
                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>
                        {/* Form */}
                        <form>
                        <div className="grid gap-y-4">
                            {/* Form Group */}
                            <div>
                            <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                            <div className="relative">
                                <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                <svg className="h-5 w-5 text-red-500" width={16} height={16} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                                </div>
                            </div>
                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                            </div>
                            {/* End Form Group */}
                            {/* Form Group */}
                            <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="password-error" />
                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                <svg className="h-5 w-5 text-red-500" width={16} height={16} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                                </div>
                            </div>
                            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                            </div>
                            {/* End Form Group */}
                            {/* Checkbox */}
                            <div className="flex items-center">
                            <div className="flex">
                                <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3">
                                <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                            </div>
                            </div>
                            {/* End Checkbox */}
                            <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign in</button>
                        </div>
                        </form>
                        {/* End Form */}
                    </div>
                    </div>
                </div>
            
        </div>
        <div className="w-full max-w-md mx-auto p-6">
                <div className="relative ml-4">
                <img className="w-full rounded-md" src="\THG.jpeg" alt="TAN HOCK GUAN" />
                <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 mr-4 -ml-4 lg:mt-6 lg:-mb-6 lg:mr-6 lg:-ml-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0" />
                {/* SVG*/}
                <div className="absolute bottom-0 left-0">
                    <svg className="w-2/3 ml-auto h-auto text-white dark:text-slate-900" width={630} height={451} viewBox="0 0 630 451" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x={531} y={352} width={99} height={99} fill="currentColor" />
                    <rect x={140} y={352} width={106} height={99} fill="currentColor" />
                    <rect x={482} y={402} width={64} height={49} fill="currentColor" />
                    <rect x={433} y={402} width={63} height={49} fill="currentColor" />
                    <rect x={384} y={352} width={49} height={50} fill="currentColor" />
                    <rect x={531} y={328} width={50} height={50} fill="currentColor" />
                    <rect x={99} y={303} width={49} height={58} fill="currentColor" />
                    <rect x={99} y={352} width={49} height={50} fill="currentColor" />
                    <rect x={99} y={392} width={49} height={59} fill="currentColor" />
                    <rect x={44} y={402} width={66} height={49} fill="currentColor" />
                    <rect x={234} y={402} width={62} height={49} fill="currentColor" />
                    <rect x={334} y={303} width={50} height={49} fill="currentColor" />
                    <rect x={581} width={49} height={49} fill="currentColor" />
                    <rect x={581} width={49} height={64} fill="currentColor" />
                    <rect x={482} y={123} width={49} height={49} fill="currentColor" />
                    <rect x={507} y={124} width={49} height={24} fill="currentColor" />
                    <rect x={531} y={49} width={99} height={99} fill="currentColor" />
                    </svg>
                </div>
                {/* End SVG*/}
                </div>
                {/* End Col */}
            </div>
        </div>
        </main>
      
                
        </>
    )
}