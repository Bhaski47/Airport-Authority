import styles from "../../styles/admin/adminstatus.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminStatus() {

    const [data, setData] = useState({})
    const [admin, setAdmin] = useState({})

    useEffect(()=>{
        setAdmin(JSON.parse(localStorage.getItem("admin")));
    },[])

    useEffect(() => {
        async function fetchData() {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/admin/send/nocdetails`,{...admin})
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
    }, [admin]);

    return(
        <div className={styles.container}>
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
            </div>
        </div>
    )
}