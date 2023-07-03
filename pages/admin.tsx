import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Inter } from 'next/font/google';
import { useRouter } from "next/router";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { Fragment, useEffect, useState } from "react";

import UserTableRow from '@/components/elements/UserTableRow';
import authService, { checkLoggedIn } from '@/services/auth.service';
import DashboardLayout from "../components/layouts/DashboardLayout";

const inter = Inter({subsets: ['latin'] })

export type User = {
    id: number
    name: string
    email: string
    roles: Role[]
}

export type Role = {
    id: number
    name: string
}

const ERole = [
    { role: "USER" },
    { role: "TUTOR" },
    { role: "ADMIN" },
    ]

export const getServerSideProps: GetServerSideProps<{
    initialData : [User]
    }> = async () => {
        const res = await fetch("http://localhost:8080/api/admin/list");
        if (!res.ok){
            throw new Error("Unable to retrieve data");
        }
        const initialData = await res.json();
        console.log(initialData);
        return { props: { initialData } }
    }

export default function admin({
    initialData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter();

    const [isRefresh, setIsRefresh] = useState(false);
    const [data, setData] = useState<User[]>(initialData);
    //console.log(data);

    const [email, setEmail]:any = useState(
        data.map((user:User, index) => {
        if (index == 0){
            return (user.email);
        }
    }));
    //console.log(email);
    const [role, setRole]:any = useState('USER');
    //console.log(role);
    useEffect(() => {
        //setLoading(true)
        const authStatus = checkLoggedIn(authService.Roles.admin.toString())
        if (authStatus){
            fetchContent()
            //setLoading(false)
        }
        else {
            router.push("/module");
        }
    }, []);

    async function fetchContent() {
        setIsRefresh(true);
        fetch("http://localhost:8080/api/admin", {
            method: "GET",
            headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            }})
            .then(res => {
                if (res.ok) {
                    console.log(localStorage.getItem("token"))
                    return res.text();
                }
                throw res;
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
    
    async function handleRefresh() {
        setIsRefresh(true);
        fetch("http://localhost:8080/api/admin/list")
        .then(res => {
            if(!res.ok){
                throw new Error("Unable to fetch data");
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            //console.log(data);
            if(data = null){
                console.log("null")
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setIsRefresh(false);
        })
    }

    async function addRole(e:any){
        setIsRefresh(true);
        e.preventDefault();
        let params = {
        email,
        role
        };

        const data = Object.entries(params)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');

        fetch("http://localhost:8080/api/admin/add",{
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "content-type": "application/x-www-form-urlencoded"
            },
            body: data
        }).then(res => {
            if(res.ok){
                return res.json;
            }
            throw res;
        })
        .catch(error => {
            console.error("Error: ", error);
            // setIsError(true);
        })
        .finally(() => {
            handleRefresh();
        })
    }

    async function deleteRole(e:any){
        setIsRefresh(true);
        e.preventDefault();
        let params = {
        email,
        role
        };
        console.log(email);
        console.log(role);
        const data = Object.entries(params)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');
        console.log(data);
        fetch("http://localhost:8080/api/admin/delete",{
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "content-type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: data
        }).then(res => {
            if(res.ok){
                return res.json;
            }
            throw res;
        }).catch(error => {
            console.error("Error: ", error);
            // setIsError(true);
        })
        .finally(() => {
            // setIsLoading(false);
            handleRefresh();
        })
    }
    
    return (
        <DashboardLayout>
        {/* ========== MAIN CONTENT ========== */}
        {/* Content */}
        <div className="w-full pt-10 pb-5 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
            {/* Page Heading */}
            <div>
            <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">Add/Remove account roles here</p>
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
                        <form>
                        <div className="px-6 py-4 grid gap-3 md:flex md:items-center border-b border-gray-200 dark:border-gray-700">
                            {/* User Dropdown List */}
                            <Listbox value={email} onChange={setEmail}>
                                <div className="relative mt-1">
                                <Listbox.Label>Email :</Listbox.Label>
                                <div className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200 pl-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{email}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    </span>
                                </Listbox.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {data.map((person:any, personIdx:any) => (
                                        <Listbox.Option
                                        key={personIdx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={person.email}
                                        >
                                        {({ selected }) => (
                                            <>
                                            <span
                                                className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {person.email}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                            </>
                                        )}
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                                </div>
                            </Listbox>
                            {/* Role Dropdown List */}
                            <Listbox value={role} onChange={setRole}>
                                <div className="relative mt-1">
                                <Listbox.Label>Role :</Listbox.Label>
                                <div className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200 pl-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{role}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    </span>
                                </Listbox.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {ERole.map((Role:any, RoleIdx:any) => (
                                        <Listbox.Option
                                        key={RoleIdx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={Role.role}
                                        >
                                        {({ selected }) => (
                                            <>
                                            <span
                                                className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {Role.role}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                            </>
                                        )}
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                                </div>
                            </Listbox>
                            <button onClick={addRole} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"> {/* onClick={() => setAddImageModalOpen(true)} */}
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                Add Role
                            </button>

                            <button onClick={deleteRole} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"> {/* onClick={() => setAddImageModalOpen(true)} */}
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                Remove Role
                            </button>
                        </div>
                        </form>
                        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                            <div className="inline-flex gap-x-2">
                                <button onClick={handleRefresh} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"> {/* onClick={handleRefresh} */}
                                    <svg className={`animate-spin h-4 w-4 text-white ${isRefresh ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> {/* */}
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Refresh
                                </button>

                                
                            </div>
                        </div>
                        {/* End Header */}

                        {/* Body to show when Empty State */}
                        <div className={`max-w-sm w-full min-h-[300px] flex flex-col justify-center mx-auto px-6 py-4 ${ data.length ? "hidden" : "" }`}>
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
                            No users found
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                User profile will show when a user has been created
                            </p>
                            <div>
                            {/* <a className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../docs/index.html">
                                Learn more
                                <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </a> */}
                            </div>
                            
                            {/* <div className="mt-5 grid sm:flex gap-2">
                                <button type="button" onClick={() => setAddImageModalOpen(true)} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlnsXlink="http://www.w3.org/2000/svg">
                                    <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    Add a new image
                                </button>
                                <Link target='_blank' href="https://cloud.google.com/compute/docs/images#community_supported_images" type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                    Use a Public Image 
                                </Link>
                            </div> 
                            */}
                            
                        </div>
                        {/* End of Body */}

                        {/* Table */}
                        <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${ data.length ? "" : "hidden"}`}> {/*  */}
                            <thead className="bg-gray-50 dark:bg-slate-800">
                            <tr>
                                {/*
                                <th scope="col" className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    ID
                                    </span>
                                </div>
                                </th>
                                
                                <th scope="col" className="px-6 py-3 text-left">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    ID
                                    </span>
                                </div>
                                </th>
                                */}
                                <th scope="col" className="px-6 py-3 text-left">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Name
                                    </span>
                                </div>
                                </th>

                                <th scope="col" className="px-6 py-3 text-left">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Email
                                    </span>
                                </div>
                                </th>

                                <th scope="col" className="px-6 py-3 text-left">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Role(s)
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
                                    data.map((user:User) => {
                                        return(
                                        <UserTableRow
                                            key={user.email}
                                            //id={user.id}
                                            name={user.name}
                                            email={user.email}
                                            roles={user.roles}
                                            //handleRefresh={handleRefresh}
                                        ></UserTableRow>
                                        );
                                    })
                                }

                                {/*
                                {
                                    data.map((user:User) => {
                                        <UserTableRow
                                            key={user.email}
                                            //id={user.id}
                                            name={user.name}
                                            email={user.email}
                                            roles={user.roles}
                                            handleRefresh={fetchContent}
                                        ></UserTableRow>
                                    })
                                }
                                */}
                            </tbody>
                            
                        </table>
                        {/* End Table */}

                        {/* Footer */}
                        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                            <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className={'font-semibold text-gray-800 dark:text-gray-200 '}>{ data.length }</span> results
                            </p>
                            </div>

                            <div>
                            <div className="inline-flex gap-x-2">
                                <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                Prev
                                </button>

                                <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                Next
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
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
        {/* <AddImageModal open={isAddImageModalOpen} onClose={() => setAddImageModalOpen(false)}></AddImageModal> */}
    </DashboardLayout>
    )
}