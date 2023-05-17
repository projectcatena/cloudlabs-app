import DashboardLayout from '@/components/layouts/DashboardLayout'
import MCard from '../components/elements/MCard'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function MainDashboard(){
    return (
        <DashboardLayout>
            {/* ========== MAIN CONTENT ========== */}
            {/* Content */}
            <div className="w-full pt-10 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                {/* Page Heading */}
                <div>
                    <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Modules</h1>
                    <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">This is a page where you can access your different module&#39;s materials.</p>
                </div>
                
                <div>
                    <div className="mb-5">
                        {/* Card */}
                        <MCard subtitle="1_EH_011800" title="Ethical Hacking" content="Explore various methods to extract valuable information from targeted systems without causing harm and gain practical experience in executing controlled attacks to simulate real-world scenarios, enabling the identification and mitigation of security weaknesses." href="/module"></MCard>
                        {/* End of Card */}
                    </div>
                    <div className="mb-5">
                        {/* Card */}
                        <MCard subtitle="1_WAPT_011800" title="Web Application Pen-Testing" content="Delve into the process of identifying and exploiting vulnerabilities in web applications to assess their resilience against cyberattacks and gain hands-on experience with tools and techniques specifically designed for web application testing, such as vulnerability scanners, proxy tools, and manual testing methodologies." href="#"></MCard>
                        {/* End of Card */}
                    </div>
                    <div className="mb-5">
                        {/* Card */}
                        <MCard subtitle="1_MATT_011800" title="Malware Analysis Tools & Techniques" content="Explore methods to extract information from malware without execution, execute malware in controlled environments, deconstruct malware binaries, and observe malware behavior." href="#"></MCard>
                        {/* End of Card */}
                    </div>
                </div>
                
                {/* End Page Heading */}
            </div>
            {/* End Content */}
            {/* ========== END MAIN CONTENT ========== */}
            
        </DashboardLayout>
    )
}