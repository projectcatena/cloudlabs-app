import Link from "next/link"
import React, { ReactComponentElement, useState } from "react"

type SubnetProps = {
    id: number,
    subnetName: string,
    ipv4Range: string,
    handleRefresh: () => void
}

const SubnetTableRow = (props: SubnetProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);

        const deleteSubnetResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/network/delete`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({subnetName: props.subnetName}),
        })
        .finally(() => {
            setIsDeleting(false);
            props.handleRefresh();
        });

        if (!deleteSubnetResponse.ok) {
            throw new Error("Network response failed.");
        }

        const deleteSubnetResult = await deleteSubnetResponse.json();
        console.log(deleteSubnetResult);

        return deleteSubnetResponse;
    }

    return (
        <tr>
            <td className="h-px w-px whitespace-nowrap">
                <div className="pl-6 py-3">
                    {/* <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                    <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-1" />
                    <span className="sr-only">Checkbox</span>
                    </label> */}
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                    <div className="flex items-center gap-x-3">
                    {/* <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" /> */}
                    <div className="grow">
                        {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageName}</span> */}
                        <span className="block text-sm text-gray-500">{props.subnetName}</span>
                    </div>
                    </div>
                </div>
            </td>
            <td className="h-px w-72 whitespace-nowrap">
            <div className="px-6 py-3">
                {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageId}</span> */}
                <span className="block text-sm text-gray-500">{props.ipv4Range}</span>
            </div>
            </td>
            {/* <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <div className="flex items-center gap-x-3">
                    <span className="text-xs text-gray-500">1/5</span>
                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                        <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200" role="progressbar" style={{width: "25%"}}></div>
                    </div>
                    </div>
                </div>
            </td> */}
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-1.5">
                    <Link onClick={handleDelete} className={`inline-flex items-center gap-x-1.5 text-sm text-red-500 decoration-2 hover:underline font-medium ${isDeleting ? "hidden" : ""}`} href="#">
                        Delete
                    </Link>
                    <svg className={`animate-spin w-4 h-4 text-white ${isDeleting ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {/* <Link className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                    Edit
                    </Link> */}
                </div>
            </td>
        </tr>
    )
}

export default SubnetTableRow;