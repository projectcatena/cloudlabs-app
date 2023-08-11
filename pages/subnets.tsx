import { Inter } from 'next/font/google'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import Link from 'next/link'
import CreateSubnetModal from '@/components/elements/CreateSubnetModal'
import { useState } from 'react'
import SubnetTableRow from '@/components/elements/SubnetTableRow'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { parseToken } from '@/services/auth.service'

type Subnet = {
    id: number,
    subnetName: string,
    ipv4Range: string
}

// TODO: Should also display virtual disks that are building, but not yet classified as an Image
// Get initial data while on server
export const getServerSideProps: GetServerSideProps<{
    initialData: [Subnet],
}> = async (context) => {

    const user = parseToken(context.req.cookies["jwt"]!);

    // Check if not TUTOR or ADMIN
    if (!(user.isTutor || user.isAdmin)) {
        return {
            notFound: true,
            /* redirect: {
                permanent: false,
                destination: '/error'
            } */
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/network/list`, {
        credentials: "include",
        headers: {
            "cookie": context.req.headers.cookie!,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
    });

    const initialData = await res.json();
    return { props: { initialData } }
}

export default function Subnets({
    initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [isAddSubnetModalOpen, setAddSubnetModalOpen] = useState(false);
    const [data, setData] = useState(initialData);
    const [isRefresh, setIsRefresh] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);

    async function handleRefresh() {
        setIsRefresh(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/network/list`, {
            credentials: "include",
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error("Error: ", error);
                // setIsError(true);
            })
            .finally(() => {
                // setIsLoading(false);
                setIsRefresh(false);
            })
    }

    // Loading handle
    // if (isLoading) return "Loading...";
    // Error handle
    // if (isError) return "Error...";

    return (
        <DashboardLayout>
            {/* ========== MAIN CONTENT ========== */}
            {/* Content */}
            <div className="w-full pt-10 pb-5 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                {/* Page Heading */}
                <div>
                    <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Subnets</h1>
                    <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">This is a page where you can access all the subnets for your compute instance.</p>
                </div>

                {/* Table Section */}

                {/* Card */}
                <div className="my-24">
                    <div className="flex flex-col">
                        {/* <div className="-m-1.5 overflow-x-auto"> */}
                        <div className="overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                                    {/* Header */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                                        <div className="inline-flex gap-x-2">
                                            <button onClick={handleRefresh} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                <svg className={`animate-spin h-4 w-4 text-white ${isRefresh ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Refresh
                                            </button>

                                            <button onClick={() => setAddSubnetModalOpen(true)} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                </svg>
                                                Add Subnet
                                            </button>
                                        </div>
                                    </div>
                                    {/* End Header */}

                                    {/* Body to show when Empty State */}
                                    <div className={`max-w-sm w-full min-h-[300px] flex flex-col justify-center mx-auto px-6 py-4 ${data.length ? "hidden" : ""}`}>
                                        <div className="flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800">
                                            {/* <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                </svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                        </div>

                                        <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
                                            No subnets found
                                        </h2>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            Create a new subnet.
                                        </p>
                                        <div>
                                            {/* <a className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../docs/index.html">
                                Learn more
                                <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </a> */}
                                        </div>

                                        <div className="mt-5 grid sm:flex gap-2">
                                            <button type="button" onClick={() => setAddSubnetModalOpen(true)} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                </svg>
                                                Add a new subnet
                                            </button>
                                        </div>
                                    </div>
                                    {/* End of Body */}

                                    {/* Table */}
                                    <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${data.length ? "" : "hidden"}`}>
                                        <thead className="bg-gray-50 dark:bg-slate-800">
                                            <tr>
                                                <th scope="col" className="pl-6 py-3 text-left">
                                                    {/* <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                                        <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main" />
                                        <span className="sr-only">Checkbox</span>
                                    </label> */}
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
                                                            IPCIDR
                                                        </span>
                                                    </div>
                                                </th>
                                                {/* <th scope="col" className="px-6 py-3 text-left">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Portfolio
                                    </span>
                                </div>
                                </th> */}
                                                <th scope="col" className="px-6 py-3 text-right"></th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {
                                                data.map((subnet) => (
                                                    <SubnetTableRow
                                                        key={subnet.id}
                                                        id={subnet.id}
                                                        subnetName={subnet.subnetName}
                                                        ipv4Range={subnet.ipv4Range}
                                                        handleRefresh={handleRefresh}
                                                    ></SubnetTableRow>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {/* End Table */}

                                    {/* Footer */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">{data.length}</span> results
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
            {/* End Content */}
            {/* ========== END MAIN CONTENT ========== */}
            <CreateSubnetModal open={isAddSubnetModalOpen} onClose={() => setAddSubnetModalOpen(false)} subnetName={''} ipv4Range={''}></CreateSubnetModal>
        </DashboardLayout>
    )
}
