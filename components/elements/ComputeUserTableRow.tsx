import { ComputeInstance } from "@/pages/compute/users";
import React, { useEffect, useState } from "react";

type UserProps = {
    //id: number,
    username: string,
    fullName: string,
    email: string,
    computes: ComputeInstance[],
    //handleRefresh: () => void
    onSelect: (email: string, isSelected: boolean) => void;
    isSelected: boolean
}


const ComputeUserTableRow = (props: UserProps) => {

    const [localIsSelected, setLocalIsSelected] = useState(props.isSelected);

    useEffect(() => {
        setLocalIsSelected(props.isSelected);
    }, [props.isSelected]);

    const handleCheckBoxChange = () => {
        const newSelectedState = !localIsSelected;
        setLocalIsSelected(newSelectedState);
        props.onSelect(props.email, newSelectedState);
    };

    return (
        <>
            <tr>
                <td className="px-6 py-4">
                    <label htmlFor={`checkbox-${props.email}`} className="flex items-center focus:outline-none">
                        <input  id={`checkbox-${props.email}`} type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        checked={localIsSelected} onChange={handleCheckBoxChange}></input>
                    </label>
                </td>
                <td className="h-px w-36 whitespace-nowrap">
                    <div className="py-3">
                        {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageId}</span> */}
                        <span className="block text-sm text-gray-500">{props.email}</span>
                    </div>
                </td>
                <td className="h-px w-36 whitespace-nowrap">
                    <div className="py-3">
                        {/* <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.imageId}</span> */}
                        <span className="block text-sm text-gray-500">{props.username}</span>
                    </div>
                </td>
                <td className="h-px w-36 px-3 whitespace-nowrap">
                    <div className="py-3">
                        {/* <span className="text-sm text-gray-500">28 Dec, 12:12</span> */}
                        <span className="text-sm text-gray-500">
                            {props.fullName}
                        </span>
                    </div>
                </td>
                <td className="h-px w-px whitespace-nowrap">
                    <div className="py-3">
                        {
                            props.computes.map((computeinstance: ComputeInstance, key) => {
                                //console.log(role.name);
                                return (
                                    <span key={key} className="text-sm text-gray-500">
                                        {computeinstance.instanceName + " "}
                                    </span>
                                )
                            })}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default ComputeUserTableRow;
