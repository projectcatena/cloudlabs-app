import Link from "next/link"
import { useState } from "react"
import ErrorToast from "./ErrorToast"

type SubnetProps = {
    id: number,
    subnetName: string,
    ipv4Range: string,
    handleRefresh: () => void
}

const SubnetTableRow = (props: SubnetProps) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        try {
            setIsDeleting(true);

        const deleteSubnetResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/network/delete`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({subnetName: props.subnetName}),
        });

        if (!deleteSubnetResponse.ok) {
            throw new Error("Network Failure");
        }

        const deleteSubnetResult = await deleteSubnetResponse.json();
        setIsDeleting(false);
        props.handleRefresh();

        return deleteSubnetResult;
        } catch (error) {
            setIsError(true);
            setErrorMessage("Failed to delete subnet")
        }
        
    }

    return (
        <tr>
            <td className="h-px w-2/5 whitespace-nowrap">
                <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                    <div className="flex items-center gap-x-3 ml-6">
                    {/* <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src="basicprofilepicture.jpeg" alt="Image Description" /> */}
                    <div className="grow">
                        {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageName}</span> */}
                        <span className="block text-sm text-gray-500 truncate hover:text-clip">{props.subnetName}</span>
                    </div>
                    </div>
                </div>
            </td>
            <td className="h-px w-3/5 whitespace-nowrap">
                <div className="px-6 py-3 mr-14 flex items-center justify-between">
                    {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageId}</span> */}
                    <span className="block text-sm text-gray-500 truncate hover:text-clip">{props.ipv4Range}</span>
                    <Link onClick={handleDelete} className={`inline-flex items-center gap-x-1.5 text-sm text-red-500 decoration-2 hover:underline font-medium ${isDeleting ? "hidden" : ""}`} href="#">
                        Delete
                    </Link>
                    <svg className={`animate-spin w-4 h-4 text-white ${isDeleting ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    
                </div>
                <div>
                <ErrorToast isOpen={isError} onClose={() => setIsError((prev) => !prev)} errorMessage={errorMessage} />
                </div>
            </td>
        </tr>
    )
}

export default SubnetTableRow;