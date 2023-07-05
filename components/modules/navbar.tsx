import Link from "next/link";
import React from "react";

type Props = {
    onMenuButtonClick(): void;
}

const Navbar = () => {

    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-3 sm:py-0 dark:bg-slate-900">
            <nav className="relative max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8" aria-label="Global">
                <div className="flex items-center justify-between">
                    <a className="flex-none text-3xl font-semibold dark:text-white" href="#" aria-label="Brand">Cloud<span className="text-blue-600">Labs</span></a>
                </div>
                <div className="flex gap-y-4 gap-x-0 flex-row items-center justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7"> {/* Log in button not aligned properly on mobile */}
                    <Link className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500" href="/login">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        Log in
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
