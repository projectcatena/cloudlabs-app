import DashboardLayout from '@/components/layouts/DashboardLayout'
import ModuleCard from '../components/elements/ModuleCard'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import ErrorModal from '@/components/elements/ErrorModal';
import { error } from 'console';
import CreateModuleModal from '@/components/elements/CreateModuleModal'
import DeleteModuleModal from '@/components/elements/DeleteModuleModal'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getUser } from '@/services/auth.service';
import { User } from '@/entity/entity';

const inter = Inter({ subsets: ['latin'] })

interface Module {
    moduleId: number;
    moduleSubtitle: string;
    moduleName: string;
    moduleDescription: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies["jwt"]

    if (token) {
        const user = getUser(token);

        // Cannot directly return object, need to use this hack to serialize
        const userData = JSON.parse(JSON.stringify(user));

        return {
            props: {
                userData
            }
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: "/login",
        },
    }
}

export default function Dashboard({
    userData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openCreateModuleModal, setOpenCreateModuleModal] = useState(false);
    const [openDeleteModuleModal, setOpenDeleteModuleModal] = useState(false);
    const [moduleData, setModuleData] = useState<Module[]>([]);
    // const [user, setUser] = useState<User>(JSON.parse(userData));
    const user: User = JSON.parse(JSON.stringify(userData));

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/Modules"); // Fetch data from backend endpoint
            // If successful, adds the modules to "modules"
            if (response.ok) {
                const modules = await response.json();
                setModuleData(modules);
            } else {
                throw new Error("Error fetching module data");
            }
        } catch (error) {
            console.error("Error fetching module data", error)
        }
    }

    return (
        <DashboardLayout user={user}>
            {/* ========== MAIN CONTENT ========== */}
            {/* Content */}
            <div className="w-full pt-10 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                {/* Page Heading */}
                <div>
                    <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Modules</h1>
                    <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">This is a page where you can access your different module&#39;s materials.</p>
                    <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-3">
                        {/* TODO: Implement RBAC such that only tutors can Create module */}
                        <button onClick={() => setOpenCreateModuleModal(true)} className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                            Add Module
                        </button>

                        {/* TODO: Implement RBAC such that only tutors can Delete module */}
                        <button onClick={() => setOpenDeleteModuleModal(true)} className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                            Delete Module
                        </button>
                    </div>
                </div>

                <div>
                    {moduleData.length > 0 ? (
                        moduleData.map((module) => (
                            <div className="mb-5" key={module.moduleId}>
                                {/* Card */}
                                <ModuleCard
                                    subtitle={module.moduleSubtitle}
                                    title={module.moduleName}
                                    description={module.moduleDescription}
                                    href="#"
                                    moduleId={module.moduleId}
                                />
                                {/* End of Card */}
                            </div>
                        ))
                    ) : (
                        <p>No modules available.</p>
                    )}
                </div>

                {/* End Page Heading */}
            </div>
            {/* Modals */}
            <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} errorMessage="A connection error has occured." />
            <CreateModuleModal open={openCreateModuleModal} onClose={() => setOpenCreateModuleModal(false)} subtitle={''} title={''} description={''} />
            <DeleteModuleModal open={openDeleteModuleModal} onClose={() => setOpenDeleteModuleModal(false)} />
            {/* End Content */}
            {/* ========== END MAIN CONTENT ========== */}

        </DashboardLayout>
    )
}
