import DashboardLayout from '@/components/layouts/DashboardLayout'
import ModuleCard from '../components/elements/ModuleCard'
import { Inter } from 'next/font/google'
import React from 'react'
import { useState } from 'react';
import ErrorModal from '@/components/elements/ErrorModal';
import { error } from 'console';
import CreateModuleModal from '@/components/elements/CreateModuleModal'

const inter = Inter({ subsets: ['latin'] })

export default function MainDashboard(){

    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openCreateVirtualMachineModal, setOpenCreateModuleModal] = useState(false);

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
                        {/* TODO: Implement RBAC such that only tutors can Create module */}
                        <button onClick={() => setOpenCreateModuleModal(true)} className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                        Add Module
                        </button>

                        {/* TODO: Implement RBAC such that only tutors can Delete module */}
                        <button className="w-full sm:w-40 inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                        Delete Module
                        </button>
                    </div>
                </div>
                
                <div>
                    <div className="mb-5">
                        {/* Card */}
                        <ModuleCard subtitle="1_EH_011800" title="Ethical Hacking" content="Explore various methods to extract valuable information from targeted systems without causing harm and gain practical experience in executing controlled attacks to simulate real-world scenarios, enabling the identification and mitigation of security weaknesses." href="/module"></ModuleCard>
                        {/* End of Card */}
                    </div>
                    <div className="mb-5">
                        {/* Card */}
                        <ModuleCard subtitle="1_WAPT_011800" title="Web Application Pen-Testing" content="Delve into the process of identifying and exploiting vulnerabilities in web applications to assess their resilience against cyberattacks and gain hands-on experience with tools and techniques specifically designed for web application testing, such as vulnerability scanners, proxy tools, and manual testing methodologies." href="#"></ModuleCard>
                        {/* End of Card */}
                    </div>
                    <div className="mb-5">
                        {/* Card */}
                        <ModuleCard subtitle="1_MATT_011800" title="Malware Analysis Tools & Techniques" content="Explore methods to extract information from malware without execution, execute malware in controlled environments, deconstruct malware binaries, and observe malware behavior." href="#"></ModuleCard>
                        {/* End of Card */}
                    </div>
                </div>
                
                {/* End Page Heading */}
            </div>
            {/* Modals */}
        <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} errorMessage="A connection error has occured." />
        <CreateModuleModal open={openCreateVirtualMachineModal} onClose={() => setOpenCreateModuleModal(false)} subtitle={''} title={''} description={''} />
            {/* End Content */}
            {/* ========== END MAIN CONTENT ========== */}
            
        </DashboardLayout>
    )
}