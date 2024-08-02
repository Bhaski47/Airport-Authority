import styles from "../../styles/employee/employeestatus.module.css"

export default function EmployeeStatus() {
    return(
        <div className={styles.container}>
            <div className={styles.box}>
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <th>HOD - IT</th>
                        <td>Verified / Pending</td>
                    </tr>
                    <tr>
                        <th>HOD - HR</th>
                        <td>Verified / Pending</td>
                    </tr>
                    <tr>
                        <th>HOD - Estate</th>
                        <td>Verified / Pending</td>
                    </tr>
                    <tr>
                        <th>HOD - NAD Society</th>
                        <td>Verified / Pending</td>
                    </tr>
                    <tr>
                        <th>HOD - Security</th>
                        <td>Verified / Pending</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}