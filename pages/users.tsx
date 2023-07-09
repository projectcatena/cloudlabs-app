import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getUser } from "@/services/auth.service";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Inter } from 'next/font/google';
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps<{
    token: string
}> = async (context) => {

    const token = context.req.cookies["jwt"];

    if (!token) {
        throw new Error("cookie not found");
    }

    return { props: { token } };
}

export default function Users({
    token
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const user = getUser(token);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetchContent()
    }, []);

    async function fetchContent() {
        const res = await fetch("http://localhost:8080/api/users", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        if (res.ok) {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>

            <DashboardLayout user={user}>
                <div className="w-full pt-10 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                    {/* Page Header */}
                    <div >
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Users
                        </h1>
                    </div>
                    {/* Page Description */}
                    <div>
                        <h2 className="text-sm text-gray-600 dark:text-gray-400">
                            Quota available for each user includes the lab quota and the user quota. This does not include hours consumed during schedule events.
                        </h2>
                    </div>
                    {/* Table Section */}

                    {/* Card */}
                    <div className="my-24">
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                                        {/* Header */}
                                        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                                            <div className="inline-flex gap-x-2">
                                                <Link className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
                                                    View all
                                                </Link>

                                                <Link className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
                                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                    </svg>
                                                    Add user
                                                </Link>
                                            </div>
                                        </div>
                                        {/* End Header */}

                                        {/* Table */}
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-slate-800">
                                                <tr>
                                                    <th scope="col" className="pl-6 py-3 text-left">
                                                        <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                                                            <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main" />
                                                            <span className="sr-only">Checkbox</span>
                                                        </label>
                                                    </th>

                                                    <th scope="col" className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Name
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-6 py-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Role
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-6 py-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Status
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-6 py-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Portfolio
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-6 py-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Created
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-6 py-3 text-right"></th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                <tr>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 py-3">
                                                            <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                                                                <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-1" />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" />
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Christina Bersh</span>
                                                                    <span className="block text-sm text-gray-500">christina@site.com</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Student</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                </svg>
                                                                Active
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <span className="text-xs text-gray-500">1/5</span>
                                                                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                                    <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{ width: "25%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-500">28 Dec, 12:12</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 py-3">
                                                            <label htmlFor="hs-at-with-checkboxes-2" className="flex">
                                                                <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-2" />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" />
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">David Harrison</span>
                                                                    <span className="block text-sm text-gray-500">david@site.com</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Student</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                </svg>
                                                                Warning
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <span className="text-xs text-gray-500">3/5</span>
                                                                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                                    <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{ width: "78%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-500">20 Dec, 09:27</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 py-3">
                                                            <label htmlFor="hs-at-with-checkboxes-3" className="flex">
                                                                <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-3" />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" />
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Anne Richard</span>
                                                                    <span className="block text-sm text-gray-500">anne@site.com</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Student</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                </svg>
                                                                Active
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <span className="text-xs text-gray-500">5/5</span>
                                                                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                                    <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{ width: "100%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-500">18 Dec, 15:20</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 py-3">
                                                            <label htmlFor="hs-at-with-checkboxes-4" className="flex">
                                                                <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-4" />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" />
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Samia Kartoon</span>
                                                                    <span className="block text-sm text-gray-500">samia@site.com</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Student</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                </svg>
                                                                Active
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <span className="text-xs text-gray-500">0/5</span>
                                                                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                                    <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{ width: "1%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-500">18 Dec, 15:20</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 py-3">
                                                            <label htmlFor="hs-at-with-checkboxes-5" className="flex">
                                                                <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-5" />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" />
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">David Harrison</span>
                                                                    <span className="block text-sm text-gray-500">david@site.com</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Student</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                                </svg>
                                                                Danger
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <span className="text-xs text-gray-500">3/5</span>
                                                                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                                    <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{ width: "78%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-500">15 Dec, 14:41</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 py-3">
                                                            <label htmlFor="hs-at-with-checkboxes-6" className="flex">
                                                                <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-6" />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" />
                                                                <div className="grow">
                                                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Brian Halligan</span>
                                                                    <span className="block text-sm text-gray-500">brian@site.com</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-72 whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Student</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                </svg>
                                                                Active
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-3">
                                                                <span className="text-xs text-gray-500">2/5</span>
                                                                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                                    <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{ width: "40%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-500">11 Dec, 18:51</span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* End Table */}

                                        {/* Footer */}
                                        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-semibold text-gray-800 dark:text-gray-200">6</span> results
                                                </p>
                                            </div>

                                            <div>
                                                <div className="inline-flex gap-x-2">
                                                    <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                                        </svg>
                                                        Prev
                                                    </button>

                                                    <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                        Next
                                                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End Footer */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}
                </div>
                {/* End Table Section */}
            </DashboardLayout>
        </>
    )
}
