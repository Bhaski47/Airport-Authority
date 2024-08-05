import styles from "../../styles/employee/employeestatus.module.css"
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function EmployeeStatus() {
    const [data, setData] = useState({})
    const [employee, setEmployee] = useState({})
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
    useEffect(()=>{
            setEmployee(JSON.parse(localStorage.getItem("employee")));
    },[])

    useEffect(() => {
        async function fetchData() {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/employee/send/nocdetails`,{...employee})
                .then(res => {
                    if(res.data.status_code === 200) {
                        setData(res.data.data);
                    }
                    else if(res.data.status_code === 404) {
                        setData({download:true})
                        toast.error(res.data.message);
                    }
                })
        }
        fetchData();
    }, [employee]);
    return(
        <div className={styles.container}>
            {isDownloadModalOpen ? <FormComponent setIsDownloadModalOpen={setIsDownloadModalOpen} employee={employee} /> :
            <div className={styles.box}>
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <th>HOD - IT</th>
                        <td>{data.it}</td>
                    </tr>
                    <tr>
                        <th>HOD - HR</th>
                        <td>{data.hr}</td>
                    </tr>
                    <tr>
                        <th>HOD - Estate</th>
                        <td>{data.estate}</td>
                    </tr>
                    <tr>
                        <th>HOD - NAD Society</th>
                        <td>{data.society}</td>
                    </tr>
                    <tr>
                        <th>HOD - Security</th>
                        <td>{data.security}</td>
                    </tr>
                    </tbody>
                </table>
                <button disabled={data.download} onClick={()=>setIsDownloadModalOpen(true)}>Download</button>
            </div>
            }
        </div>
    )
}

const FormComponent = ({setIsDownloadModalOpen,employee}) => {
    return(
        <>
            <div className={styles.modalBox}>
            <h1 onClick={()=>setIsDownloadModalOpen(false)}>Close</h1>
                <div className={styles.box}>
                    <h3>Mr/Ms {employee.name} from {employee.department} department having obtained clearance from all concerned may be relieved of his/her duties.The NOC credentials have been verified and the NOC can be generated</h3>
                </div>
            </div>
        </>
    )
}