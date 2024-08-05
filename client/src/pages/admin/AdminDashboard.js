import React, {useEffect, useState} from 'react';
import styles from "../../styles/admin/admindashboard.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [admin, setAdmin] = useState({})
    const [employeeEmail, setEmployeeEmail] = useState('')

    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem("admin")));
        setEmployeeEmail(JSON.parse(localStorage.getItem("admin")).email)
    }, []);

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            {isModalOpen ? <FormComponent setIsModalOpen={setIsModalOpen} email={employeeEmail} /> :
                <div className={styles.dataContainer}>
                    <h2 style={{textAlign:"center"}}>Admin</h2>
                    <div className={styles.status}>
                        <h3>Name: {admin.name}</h3>
                        <h3>Dept: {admin.department === "SOCIETY" ? "NAD SOCIETY" : admin.department}</h3>
                        <h3>Designation: {admin.designation}</h3>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={()=>navigate("/admin/adminreceived")}>NOC - Received</button>
                        <button onClick={() => setIsModalOpen(true)}>NOC - Apply</button>
                        <button onClick={()=>navigate("/admin/adminstatus")}>NOC - Status</button>
                    </div>
                </div>
            }
        </div>
    );
}

const FormComponent = ({setIsModalOpen,email}) => {
    const [formData, setFormData] = useState({
        email:email,
        bookReturn: '',
        gemUser: '',
        gemId: '',
        gemIdTransfer:'',
        date:'',
        creditSocietyClearance: '',
        pmsSubmission: '',
        accessCardReturn: '',
        registerReturn: '',
        itAssetsReturn: '',
        sapUser: '',
        sapId: '',
        residentialQuarters: '',
        cpppUser: '',
        cpppId: '',
        employeeCardReturn: '',
        nocReason: '',
        biometricTransfer: '',
        officeDues: '',
        identityCardReturn: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const submitHandler = async(e) => {
        e.preventDefault();
        const data = {
            ...formData,
        }
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/admin/create/noc`,{...data}).then((res) => {
            if (res.data.status_code === 200) {
                toast.success(res.data.message);
            }
            else if(res.data.status_code === 400){
                toast.error(res.data.message);
            }
            else toast.error(res.data.message);
        })
    };

    const { gemUser,itAssetsReturn,residentialQuarters,registerReturn,date,accessCardReturn,pmsSubmission,creditSocietyClearance,gemIdTransfer, gemId, sapUser, sapId, cpppUser, cpppId } = formData;

    return (
        <div>
            <h1 onClick={()=>setIsModalOpen(false)}>Close</h1>
            <form onSubmit={submitHandler}>
                <p>1. Return of books taken from AAI Library</p>
                <input type="radio" name="bookReturn" value="yes" onChange={handleInputChange}/>
                <label>Yes</label>
                <input type="radio" name="bookReturn" value="no" onChange={handleInputChange}/>
                <label>No</label>

                <p>2. Are You A GEM User?</p>
                <input type="radio" name="gemUser" value="yes" onChange={handleInputChange}/>
                <label>Yes</label>
                <input type="radio" name="gemUser" value="no" onChange={handleInputChange}/>
                <label>No</label>

                {gemUser === 'yes' && (
                    <>
                        <p>Enter your Gem ID</p>
                        <input type="text" name="gemId" value={gemId} onChange={handleInputChange}/>
                        <p>Whether the GEM ID is transferred to the charge taking over official (YES/NO)</p>
                        <input type="text" name="gemIdTransfer" value={gemIdTransfer} onChange={handleInputChange}/>
                    </>
                )}
                <p> 3.Date of Applying</p>
                <input type="date" name="date" value={date} id="dateOfApplying" onChange={handleInputChange}/>
                <p>4. Clearance from AAI Thrift Credit society, RHQ, SR</p>
                <select name="creditSocietyClearance" value={creditSocietyClearance} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>5. Submission of PMS (Performance Monitoring System)</p>
                <select name="pmsSubmission" value={pmsSubmission} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>6. Return of Access Card</p>
                <select name="accessCardReturn" value={accessCardReturn} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>7. Return of all papers, files, registers, confidential boxes to your concerned department</p>
                <select name="registerReturn" value={registerReturn} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>8. Whether all the IT assets are given back</p>
                <select name="itAssetsReturn" value={itAssetsReturn} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
                <p>9. Do You Possess a SAP Login ID?</p>
                <input type="radio" name="sapUser" value="yes" onChange={handleInputChange}/>
                <label>Yes</label>
                <input type="radio" name="sapUser" value="no" onChange={handleInputChange}/>
                <label>No</label>

                {sapUser === 'yes' && (
                    <>
                        <p>Enter your SAP ID</p>
                        <input type="text" name="sapId" value={sapId} onChange={handleInputChange}/>
                    </>
                )}

                <p>10. Surrender of Residential Quarters Allotted If Any</p>
                <select name="residentialQuarters" value={residentialQuarters} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                    <option value="DON'T HAVE ANY">DON'T HAVE ANY</option>
                </select>

                <p>11. Are You A CPPP User?</p>
                <input type="radio" name="cpppUser" value="yes" onChange={handleInputChange}/>
                <label>Yes</label>
                <input type="radio" name="cpppUser" value="no" onChange={handleInputChange}/>
                <label>No</label>

                {cpppUser === 'yes' && (
                    <>
                        <p>Any tender is under process under your CPPP ID</p>
                        <input type="text" name="cpppId" value={cpppId} onChange={handleInputChange}/>
                    </>
                )}

                <p>12. Return of AAI Employee Card/Medical Card</p>
                <input type="radio" name="employeeCardReturn" id="e1" value="yes" onChange={handleInputChange}/>
                <label htmlFor="e1">Yes</label>
                <input type="radio" name="employeeCardReturn" id="e2" value="no" onChange={handleInputChange}/>
                <label htmlFor="e2">No</label>

                <p>13. Reason for Applying NOC</p>
                <input type="radio" name="nocReason" id="n1" value="transfer" onChange={handleInputChange}/>
                <label htmlFor="n1">Transfer</label>
                <input type="radio" name="nocReason" id="n2" value="retirement" onChange={handleInputChange}/>
                <label htmlFor="n2">Retirement</label>

                <p>14. Have You Transferred out from Biometric Attendance System, RHQ, SR</p>
                <input type="radio" name="biometricTransfer" id="b1" value="yes" onChange={handleInputChange}/>
                <label htmlFor="b1">Yes</label>
                <input type="radio" name="biometricTransfer" id="b2" value="no" onChange={handleInputChange}/>
                <label htmlFor="b2">No</label>

                <p>15. Is there any office dues such as recovery of overpayment, private trunk call charges sent to
                    residence, and recovery on losses</p>
                <input type="radio" name="officeDues" id="o1" value="yes" onChange={handleInputChange}/>
                <label htmlFor="o1">Yes</label>
                <input type="radio" name="officeDues" id="o2" value="no" onChange={handleInputChange}/>
                <label htmlFor="o2">No</label>

                <p>16. Return of identity card and BCAS AEP No</p>
                <input type="radio" name="identityCardReturn" id="i1" value="yes" onChange={handleInputChange}/>
                <label htmlFor="i1">Yes</label>
                <input type="radio" name="identityCardReturn" id="i2" value="no" onChange={handleInputChange}/>
                <label htmlFor="i2">No</label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};