import Sidebar from '../components/modules/sidebar'
import Module from '../components/elements/module_card'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center dark:bg-slate-900 ${inter.className}`}
    >
        <div className="bg-gray-50 dark:bg-slate-900">
            {/* ========== MAIN CONTENT ========== */}
            <Sidebar></Sidebar>
            {/* Content */}
            <div className="w-full pt-10 px-4 space-y-4 sm:px-6 md:px-8 lg:pl-72">
                {/* Page Heading */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-blue-600">23S1-1_EH_011800</p>
                  <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Ethical Hacking</h1>
                  <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">This is a page where you can access all the virtual machines for a module.</p>
                  <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                      <a className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800" href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html" target="_blank">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        Get the source code
                      </a>
                      <a className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 ring-offset-gray-50 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-4 dark:ring-offset-slate-900" href="../examples.html">
                        <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.2792 1.64001L5.63273 7.28646C5.43747 7.48172 5.43747 7.79831 5.63273 7.99357L11.2792 13.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        Back to examples
                      </a>
                  </div>
                </div>

                {/* Card */}
                <Module></Module>
                {/* End of Card */}
                {/* End Page Heading */}
            </div>
            {/* End Content */}
            {/* ========== END MAIN CONTENT ========== */}
        </div>
    </main>
  )
}