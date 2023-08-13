
type SnapshotProps = {
    //id: number,
    name: string,
    description: string,
    //roles: Role[],
    //handleRefresh: () => void
}

const SnapshotTableRow = (props: SnapshotProps) => {

    return (
        <>
        <tr>
            <td className="h-px w-px whitespace-nowrap">
            <div className="px-6 py-3">
                {/* <span className="text-sm text-gray-500">28 Dec, 12:12</span> */}
                <span className="text-sm text-gray-500 truncate hover:text-clip">
                    {props.name}
                </span>
            </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
            <div className="px-6 py-3">
                {/* <span className="text-sm text-gray-500">28 Dec, 12:12</span> */}
                <span className="text-sm text-gray-500 truncate hover:text-clip">
                    {props.description}
                </span>
            </div>
            </td>
        </tr>
    </>
    )
}

export default SnapshotTableRow;