import ErrorToast from "@/components/elements/ErrorToast";
import ModuleUserTableRow from "@/components/elements/ModuleUserTableRow";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { parseToken } from "@/services/auth.service";
import { Listbox, Transition } from "@headlessui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";

export type User = {
    id: number,
    fullname: string,
    username: string,
    email: string,
    modules: Module[]
    isSelected: boolean;
}

export type Module = {
    moduleId: number,
    moduleName: string
}

// TODO: Handle and format JSON
export const getServerSideProps: GetServerSideProps<{
    initialUserData: [User], initialModuleData:[Module]
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

    const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Modules/list-users-modules`, {
        method: "GET",
        credentials: "include",
        headers: {
            "cookie": context.req.headers.cookie!,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
    });

    if (!userRes.ok) {
        return {
            notFound: true,
        }
    }

    const initialUserData = await userRes.json();

    const moduleRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Modules/list`, {
        method: "GET",
        credentials: "include",
        headers: {
          "cookie": context.req.headers.cookie!,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
      if (!moduleRes.ok) {
        return {
            notFound: true,
        }
    }

    const initialModuleData = await moduleRes.json();
    console.log(initialModuleData);

    return { props: { initialUserData, initialModuleData } }
}

export default function Users({
    initialUserData, initialModuleData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isRefresh, setIsRefresh] = useState(false);
    const [userData, setUserData] = useState<User[]>(initialUserData);
    const [moduleData, setModuleData] = useState<Module[]>(initialModuleData);
    console.log(moduleData)

    const [moduleId, setModuleId] = useState("");
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [selectAll, setSelectAll] = useState(false);


    const handleUserSelect = (email: string, isSelected: boolean) => {
        const updatedUserData = userData.map(user => {
            if (user.email === email) {
                return { ...user, isSelected: isSelected };
            }
            return user;
        });
    
        setUserData(updatedUserData);
    
        const allSelected = updatedUserData.every(user => user.isSelected);
        setSelectAll(allSelected);
        
        if (!isSelected) {
            setSelectedEmails(prevEmails =>
                prevEmails.filter(prevEmail => prevEmail !== email)
            );
        } else {
            setSelectedEmails(prevEmails => [...prevEmails, email]);
        }
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        
        const selectedEmailsList = newSelectAll
            ? userData.map(user => user.email) // Select all users' emails
            : [];
    
        setSelectedEmails(selectedEmailsList);
    
        const updatedUserData = userData.map(user => ({
            ...user,
            isSelected: newSelectAll
        }));
        setUserData(updatedUserData);
    };
    

    useEffect(() => {
        if (selectedModule) {
            setModuleId(selectedModule.moduleId.toString());
        } else {
            setModuleId(""); // No module selected
        }
    }, [selectedModule]);

    async function addToModule(event: any) {
        event.preventDefault();

        const postData = {
            moduleId,
            users: selectedEmails.map(email => ({ email }))
        };
        console.log(postData);

        try {
            const postRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Modules/add-users`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                body: JSON.stringify(postData),
            });

            if (!postRes.ok) {
                throw new Error("Network Failure");
            }

            const postResult = await postRes.json();
            window.location.reload();
            return postResult;
        } catch(error) {
            setIsError(true);
            setErrorMessage("Failed to add user(s)");
            console.log("Error:", error);
        }
    }

    async function removeFromModule(event: any) {
        event.preventDefault();

        const postData = {
            moduleId,
            users: selectedEmails.map(email => ({ email }))
        };
        console.log(postData);

        try {
            const postRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Modules/remove-users`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                body: JSON.stringify(postData),
            });

            if (!postRes.ok) {
                throw new Error("Network Error");
            }

            const postResult = await postRes.json();
            window.location.reload();
            return postResult;
        } catch(error) {
            setIsError(true);
            setErrorMessage("Failed to remove user(s)");
            console.log("Error:", error);
        }
    }

    async function handleRefresh() {
        setIsRefresh(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Modules/list-users-modules`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
        })
            .then(res => {
                if (!res.ok) {
                    setIsError(true);
                    setErrorMessage("Failed to add user(s)");
                }
                return res.json();
            })
            .then(data => {
                setUserData(data);
                //console.log(data);
                if (data = null) {
                    console.log("null")
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsRefresh(false);
                window.location.reload();
            })

        
    }

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>

            <DashboardLayout>
                <div className="w-full pt-10 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                    {/* Page Header */}
                    <div >
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Module Users
                        </h1>
                    </div>
                    {/* Page Description */}
                    <div>
                        <h2 className="text-sm text-gray-600 dark:text-gray-400">
                            Add Users to modules here.
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
                                        <form>
                                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-start md:items-center border-b border-gray-200 dark:border-gray-700">
                                                    {/* <button onClick={handleRefresh} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                        <svg className={`animate-spin h-4 w-4 text-white ${isRefresh ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Refresh
                                                    </button> */}
                                                    <Listbox value={selectedModule} onChange={setSelectedModule}>
                                                        <div className="relative items-center mt-1">
                                                            <Listbox.Label>Module: </Listbox.Label>
                                                            <div className="inline-block text-sm text-gray-800 dark:text-gray-200 pl-2">
                                                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                                    <span className="block truncate">{selectedModule ? selectedModule.moduleName : 'Select a module'}</span>
                                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                        </svg>
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
                                                                    {moduleData.map((module: Module, moduleIdx: any ) => (
                                                                        <Listbox.Option
                                                                            key={moduleIdx}
                                                                            className={({ active }) =>
                                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                                }`
                                                                            }
                                                                            value={module}
                                                                        >
                                                                            {({ selected }) => (
                                                                                <>
                                                                                    <span
                                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                            }`}
                                                                                    >
                                                                                        {module.moduleName}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                                                            </svg>
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
                                                        <button onClick={addToModule} className="py-2 px-3 h-9 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"> {/* onClick={() => setAddImageModalOpen(true)} */}
                                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                            </svg>
                                                            Add to Module
                                                        </button>
                                                    
                                                        <button onClick={removeFromModule} className="py-1 px-3 h-9 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"> {/* onClick={() => setAddImageModalOpen(true)} */}
                                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M11 8H4V7H11V8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                            </svg>
                                                            Remove from Module
                                                        </button>
                                            </div>
                                        </form>
                                        {/* End Header */}

                                        {/* Body to show when Empty State */}
                                    <div className={`max-w-sm w-full min-h-[300px] flex flex-col justify-center mx-auto px-6 py-4 ${initialUserData.length ? "hidden" : ""}`}>
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
                                        </div>
                                    </div>
                                        {/* End of Body */}

                                        {/* Table */}
                                        <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${initialUserData.length ? "" : "hidden"}`}> {/*  */}
                                            <thead className="bg-gray-50 dark:bg-slate-800">
                                                <tr>
                                                    <th scope="col" className="px-3 py-1 text-left">
                                                        <label htmlFor="hs-checkbox-in-form" className="flex p-3 focus:border-blue-500 focus:ring-blue-500 dark:text-gray-800">
                                                            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form"></input>
                                                            {/* <span className="text-xs text-gray-800 ml-2 dark:text-gray-200 font-semibold uppercase whitespace-nowrap">Select All</span> */}
                                                        </label>
                                                    </th>

                                                    <th scope="col" className="py-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Email
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="py-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Username
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-3 py-3 text-left">
                                                        <div className="flex items-center gap-x-2 ">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Name
                                                            </span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="py-3 px-3 text-left">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                Module(s)
                                                            </span>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {
                                                    userData.map((user: User) => {
                                                        return (
                                                            <ModuleUserTableRow
                                                                key={user.email}
                                                                username={user.username}
                                                                fullName={user.fullname}
                                                                email={user.email}
                                                                modules={user.modules}
                                                                onSelect={handleUserSelect}
                                                                isSelected={user.isSelected}
                                                            //handleRefresh={handleRefresh}
                                                            ></ModuleUserTableRow>
                                                        );
                                                    })
                                                }
                                            </tbody>    
                                        </table>


                                        {/* Footer */}
                                        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-semibold text-gray-800 dark:text-gray-200"></span>
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
                    <ErrorToast isOpen={isError} onClose={() => setIsError((prev) => !prev)} errorMessage={errorMessage} />
                </div>
                {/* End Table Section */}
            </DashboardLayout>
        </>
    )
}
