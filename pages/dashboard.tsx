import DashboardLayout from '@/components/layouts/DashboardLayout';
import ModuleCard from '../components/elements/ModuleCard';
import React, { useState } from 'react';
import ErrorModal from '@/components/elements/ErrorModal';
import CreateModuleModal from '@/components/elements/CreateModuleModal';
import DeleteModuleModal from '@/components/elements/DeleteModuleModal';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAuth, Role } from '@/contexts/AuthContext';

export type Module = {
    moduleId: number;
    moduleSubtitle: string;
    moduleName: string;
    moduleDescription: string;
}

export const getServerSideProps: GetServerSideProps<{
    data: [Module]
}> = async (context) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Modules`, {
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
                        <div className={`w-full min-h-[400px] sm:min-h-[600px] flex flex-col justify-center items-center mx-auto px-6 py-4 border-2 dark:border-slate-700 border-dashed rounded-md ${Number(data.length) != 0 ? "hidden" : ""}`}>
                            {/* <div className="flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800"> */}
                            <div className="flex justify-center items-center w-52 h-52">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" data-name="Layer 1" viewBox="0 0 647.63626 632.17383"><path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="#f2f2f2" /><path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56" /><path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" fill="#2563eb" /><circle cx="190.15351" cy="24.95465" r="20" fill="#2563eb" /><circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" /><path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="#e6e6e6" /><path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56" /><path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" fill="#2563eb" /><circle cx="433.63626" cy="105.17383" r="20" fill="#2563eb" /><circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" /></svg>
                            </div>

                            <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
                                No modules found
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Add a new module to access it.
                            </p>
                            <div>
                                <a className="inline-flex items-center mt-2 gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../docs/index.html">
                                Learn more
                                <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                </a>
                            </div>

                            <div className="mt-5 grid sm:flex gap-2">
                                <button type="button" onClick={() => setOpenCreateModuleModal(true)} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    Add a new module
                                </button>
                            </div>
                        </div>
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
