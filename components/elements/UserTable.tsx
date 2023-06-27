export default function TableBody({theadData ,tbodyData}:any) {
    return (
        <table>
            <tbody>
                {/* body row */}
                {tbodyData.map((row:any, index:any) => {
                    return <tr key={index}>
                        {/* row data */}
                        {theadData.map((key:any, index:any) => {
                            return <td key={row[key]}>{row[key]}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
        );
    }