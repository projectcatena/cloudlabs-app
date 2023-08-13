import { Role } from "@/pages/admin";
import Link from "next/link";
import { useState } from "react";
import ErrorToast from "./ErrorToast";

type UserProps = {
    //id: number,
    username: string,
    //fullName: string,
    email: string,
    roles: Role[],
    //handleRefresh: () => void
}

const UserTableRow = (props: UserProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function deleteUser() {
        setIsDeleting(true);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({email: props.email}),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response failed.");
            }
        })
        .catch(error => {
            setIsError(true);
            setErrorMessage("Failed to delete user");
            setIsDeleting(false);
        })
        .finally(() => {
            setIsDeleting(false);
            window.location.reload();
        });
    }

    return (
        <>
            <tr>
                <td className="max-w-xs h-px w-72 whitespace-nowrap ">
                    <div className="px-6 py-3">
                        {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageId}</span> */}
                        <span className="block text-sm text-gray-500">{props.email}</span>
                    </div>
                </td>
                <td className="h-px w-72 whitespace-nowrap">
                    <div className="px-6 py-3">
                        {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageId}</span> */}
                        <span className="block text-sm text-gray-500">{props.username}</span>
                    </div>
                </td>
                
                <td className="h-px w-px whitespace-nowrap">
                    <div className="px-6 py-3">
                        {
                            props.roles.map((role: Role, key) => {
                                //console.log(role.name);
                                return (
                                    <span key={key} className="text-sm text-gray-500">
                                        {role.name + " "}
                                    </span>
                                )
                            })}
                    </div>
                </td>
                <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-1.5">
                    <Link onClick={deleteUser} className={`inline-flex items-center gap-x-1.5 text-sm text-red-500 decoration-2 hover:underline font-medium ${isDeleting ? "hidden" : ""}`} href="#">
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
                <div>
                <ErrorToast isOpen={isError} onClose={() => setIsError((prev) => !prev)} errorMessage={errorMessage} />
                </div>
            </td>
            </tr>
            
        </>
    )
}

export default UserTableRow;
