import DashboardLayout from '@/components/layouts/DashboardLayout'
import VirtualMachineCard from '../components/elements/VirtualMachineCard'
import { useState } from 'react';
import CreateVirtualMachineModal, { MachineType } from '@/components/elements/CreateVirtualMachineModal';
import ErrorModal from '@/components/elements/ErrorModal';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAuth } from '@/contexts/AuthContext';

type Address = {
    ipv4Address: string,
}

export type ComputeInstance = {
    machineType: MachineType,
    instanceName: string,
    address: Address,
}

export const getServerSideProps: GetServerSideProps<{
    data: [ComputeInstance]
}> = async (context) => {

    const res = await fetch("http://localhost:8080/api/compute/list", {
        headers: {
            "cookie": context.req.headers.cookie!,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
    });

    const data = await res.json();

    return { props: { data } }
}

export default function ModuleDashboard({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const authContext = useAuth();

    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openCreateVirtualMachineModal, setOpenCreateVirtualMachineModal] = useState(false);

    return (
        <DashboardLayout>
            {/* ========== MAIN CONTENT ========== */}
            {/* Content */}
            <div className={`w-full pt-10 px-4 ${Number(data.length) === 0 ? 'space-y-8' : 'space-y-4'} sm:px-6 md:px-8 lg:pl-72`}>
                {/* Page Heading */}
                <div>
                    <p className="mb-2 text-sm font-semibold text-blue-600">23S1-1_EH_011800</p>
                    <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Ethical Hacking</h1>
                    <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">This is a page where you can access all the virtual machines for a module.</p>
                    <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-3">
                        <a className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800" href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html" target="_blank">
                            {/* <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg> */}
                            Stop All
                        </a>
                        <a className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800" href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html" target="_blank">
                            Destroy All
                        </a>

                        {
                            (authContext.user?.isTutor || authContext.user?.isAdmin ?

                                <button onClick={() => setOpenCreateVirtualMachineModal(true)} className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                                    Create VM
                                </button>
                                :
                                <></>
                            )
                        }
                        {/* <a className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 ring-offset-gray-50 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-4 dark:ring-offset-slate-900" href="../examples.html">
                    <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11.2792 1.64001L5.63273 7.28646C5.43747 7.48172 5.43747 7.79831 5.63273 7.99357L11.2792 13.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    </a> */}
                    </div>
                </div>

                {/* Card */}
                <div className={`w-full min-h-[400px] sm:min-h-[600px] flex flex-col justify-center items-center mx-auto px-6 py-4 border-2 dark:border-slate-700 border-dashed rounded-md ${Number(data.length) != 0 ? "hidden" : ""}`}>
                    {/* <div className="flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800"> */}
                    <div className="flex justify-center items-center w-52 h-52">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" data-name="Layer 1" viewBox="0 0 647.63626 632.17383"><path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="#f2f2f2" /><path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56" /><path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" fill="#2563eb" /><circle cx="190.15351" cy="24.95465" r="20" fill="#2563eb" /><circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" /><path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="#e6e6e6" /><path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56" /><path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" fill="#2563eb" /><circle cx="433.63626" cy="105.17383" r="20" fill="#2563eb" /><circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" /></svg>
                    </div>

                    <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
                        No compute instance found
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Create a compute instance to access it.
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
                        {
                            (authContext.user?.isTutor || authContext.user?.isAdmin ?

                                <button onClick={() => setOpenCreateVirtualMachineModal(true)} type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    Create a compute instance
                                </button>
                                :

                                <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                    Contact your Teacher
                                </button>
                            )
                        }
                    </div>
                </div>
                {
                    data.map((computeInstance, key) => {
                        return (<VirtualMachineCard key={key} computeInstance={computeInstance}></VirtualMachineCard>)
                    })
                }
                {/* End of Card */}
                {/* End Page Heading */}
            </div>
            {/* Modals */}
            <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} errorMessage="A connection error has occured." />
            <CreateVirtualMachineModal open={openCreateVirtualMachineModal} onClose={() => setOpenCreateVirtualMachineModal(false)} />
            {/* End Content */}
            {/* ========== END MAIN CONTENT ========== */}
        </DashboardLayout>
    )
}
