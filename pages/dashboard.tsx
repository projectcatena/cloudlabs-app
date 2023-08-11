import CreateModuleModal from '@/components/elements/CreateModuleModal';
import DeleteModuleModal from '@/components/elements/DeleteModuleModal';
import ErrorModal from '@/components/elements/ErrorModal';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Role, useAuth } from '@/contexts/AuthContext';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import ModuleCard from '../components/elements/ModuleCard';

export type Module = {
    moduleId: number;
    moduleSubtitle: string;
    moduleName: string;
    moduleDescription: string;
}

export const getServerSideProps: GetServerSideProps<{
    data: [Module]
}> = async (context) => {
    try {
        const response = await fetch("http://localhost:8080/api/Modules", {
        credentials: "include",
        headers: {
            "cookie": context.req.headers.cookie!,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        }
    });

    // Fetch data from backend endpoint
    const data = await response.json();

    return { props: { data } }
    } catch (error) {
        return {
            notFound: true
        }
    }
    
}

export default function MainDashboard({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openCreateModuleModal, setOpenCreateModuleModal] = useState(false);
    const [openDeleteModuleModal, setOpenDeleteModuleModal] = useState(false);

    const { user } = useAuth();
    const userRoles: Role[] = user?.roles || [];

    const canCreateOrDeleteModule = userRoles.some(role => role.name === 'ADMIN' || role.name === 'TUTOR');

    return (
        <DashboardLayout>
            {/* ========== MAIN CONTENT ========== */}
            {/* Content */}
            <div className="w-full pt-10 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                {/* Page Heading */}
                <div>
                    <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Modules</h1>
                    <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">This is a page where you can access your different module&#39;s materials.</p>
                    <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-3">
                        {canCreateOrDeleteModule && (
                            <>
                                <button onClick={() => setOpenCreateModuleModal(true)} className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                                    Add Module
                                </button>

                                <button onClick={() => setOpenDeleteModuleModal(true)} className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                                    Delete Module
                                </button>
                            </>
                        )}

                    </div>
                </div>

                <div>
                    {data.length > 0 ? (
                        data.map((module) => (
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
            <CreateModuleModal open={openCreateModuleModal} onClose={() => setOpenCreateModuleModal(false)} moduleSubtitle={''} moduleName={''} moduleDescription={''} />
            <DeleteModuleModal open={openDeleteModuleModal} onClose={() => setOpenDeleteModuleModal(false)} />
            {/* End Content */}
            {/* ========== END MAIN CONTENT ========== */}

        </DashboardLayout>
    )
}
