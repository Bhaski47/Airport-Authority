import React, {useEffect, useState} from 'react';
import styles from "../../styles/employee/employeedashboard.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function EmployeeDashboard() {
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [employee, setEmployee] = useState({});
    const [employeeEmail, setEmployeeEmail] = useState({})

    useEffect(() => {
        setEmployee(JSON.parse(localStorage.getItem("employee")));
        setEmployeeEmail(JSON.parse(localStorage.getItem("employee")).email);
    }, []);



    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            {isAdminModalOpen ? <FormComponent setIsEmployeeModalOpen={setIsAdminModalOpen} email={employeeEmail}/> :
                <div className={styles.dataContainer}>
                    <h2 style={{textAlign: "center"}}>Employee</h2>
                    <div className={styles.status}>
                        <h3>Name: {employee.name}</h3>
                        <h3>Dept: {employee.department}</h3>
                        <h3>Designation: {employee.designation}</h3>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={() => setIsAdminModalOpen(true)}>NOC - Apply</button>
                        <button onClick={() => navigate("/employee/employeestatus")}>NOC - Status</button>
                    </div>
                </div>
            }
        </div>
    );
}


const FormComponent = ({ setIsEmployeeModalOpen, email }) => {
    const [formData, setFormData] = useState({
        email: email,
        bookReturn: '',
        gemUser: '',
        gemId: '',
        gemIdTransfer: '',
        date: '',
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

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post("http://localhost:3000/api/employee/fetch/noc", { email });
                if (res.data.status_code === 200) {
                    let applyingDateString = '';
                    if (res.data.data.applyingDate) {
                        const dateObj = new Date(res.data.data.applyingDate);
                        if (!isNaN(dateObj.getTime())) {
                            applyingDateString = dateObj.toISOString().split('T')[0];
                        } else {
                            console.warn("Invalid date value:", res.data.data.applyingDate);
                        }
                    }
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        ...res.data.data,
                        date:applyingDateString,
                    }));
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        fetchData();
    }, [email]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleModalClose = () => {
        setIsEmployeeModalOpen(prevData => !prevData);
    };

    const handleSubmit = async () => {
        const data = {
            ...formData,
        };
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/employee/create/noc`, data);
            if (res.data.status_code === 200) {
                toast.success(res.data.message);
            } else if (res.data.status_code === 400) {
                toast.error(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while submitting the form.");
        }
    };

    return (
        <div>
            <h1 onClick={handleModalClose}>Close</h1>
            <form>
                <p>1. Return of books taken from AAI Library</p>
                <input type="radio" name="bookReturn" value="yes" checked={formData.bookReturn === 'yes'} onChange={handleInputChange} />
                <label>Yes</label>
                <input type="radio" name="bookReturn" value="no" checked={formData.bookReturn === 'no'} onChange={handleInputChange} />
                <label>No</label>

                <p>2. Are You A GEM User?</p>
                <input type="radio" name="gemUser" value="yes" checked={formData.gemUser === 'yes'} onChange={handleInputChange} />
                <label>Yes</label>
                <input type="radio" name="gemUser" value="no" checked={formData.gemUser === 'no'} onChange={handleInputChange} />
                <label>No</label>

                {formData.gemUser === 'yes' && (
                    <>
                        <p>Enter your Gem ID</p>
                        <input type="text" name="gemId" value={formData.gemId} onChange={handleInputChange} />
                        <p>Whether the GEM ID is transferred to the charge taking over official (YES/NO)</p>
                        <input type="text" name="gemIdTransfer" value={formData.gemIdTransfer} onChange={handleInputChange} />
                    </>
                )}
                <p>3. Date of Applying</p>
                <input type="date" name="date" value={formData.date} id="dateOfApplying" onChange={handleInputChange} />
                <p>4. Clearance from AAI Thrift Credit society, RHQ, SR</p>
                <select name="creditSocietyClearance" value={formData.creditSocietyClearance} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>5. Submission of PMS (Performance Monitoring System)</p>
                <select name="pmsSubmission" value={formData.pmsSubmission} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>6. Return of Access Card</p>
                <select name="accessCardReturn" value={formData.accessCardReturn} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>7. Return of all papers, files, registers, confidential boxes to your concerned department</p>
                <select name="registerReturn" value={formData.registerReturn} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>8. Whether all the IT assets are given back</p>
                <select name="itAssetsReturn" value={formData.itAssetsReturn} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
                <p>9. Do You Possess a SAP Login ID?</p>
                <input type="radio" name="sapUser" value="yes" checked={formData.sapUser === 'yes'} onChange={handleInputChange} />
                <label>Yes</label>
                <input type="radio" name="sapUser" value="no" checked={formData.sapUser === 'no'} onChange={handleInputChange} />
                <label>No</label>

                {formData.sapUser === 'yes' && (
                    <>
                        <p>Enter your SAP ID</p>
                        <input type="text" name="sapId" value={formData.sapId} onChange={handleInputChange} />
                    </>
                )}

                <p>10. Surrender of Residential Quarters Allotted If Any</p>
                <select name="residentialQuarters" value={formData.residentialQuarters} onChange={handleInputChange}>
                    <option value="" disabled>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                    <option value="DON'T HAVE ANY">DON'T HAVE ANY</option>
                </select>

                <p>11. Are You A CPPP User?</p>
                <input type="radio" name="cpppUser" value="yes" checked={formData.cpppUser === 'yes'} onChange={handleInputChange} />
                <label>Yes</label>
                <input type="radio" name="cpppUser" value="no" checked={formData.cpppUser === 'no'} onChange={handleInputChange} />
                <label>No</label>

                {formData.cpppUser === 'yes' && (
                    <>
                        <p>Any tender is under process under your CPPP ID</p>
                        <input type="text" name="cpppId" value={formData.cpppId} onChange={handleInputChange} />
                    </>
                )}

                <p>12. Return of AAI Employee Card/Medical Card</p>
                <input type="radio" name="employeeCardReturn" id="e1" value="yes" checked={formData.employeeCardReturn === 'yes'} onChange={handleInputChange} />
                <label htmlFor="e1">Yes</label>
                <input type="radio" name="employeeCardReturn" id="e2" value="no" checked={formData.employeeCardReturn === 'no'} onChange={handleInputChange} />
                <label htmlFor="e2">No</label>

                <p>13. Reason for Applying NOC</p>
                <input type="radio" name="nocReason" id="n1" value="transfer" checked={formData.nocReason === 'transfer'} onChange={handleInputChange} />
                <label htmlFor="n1">Transfer</label>
                <input type="radio" name="nocReason" id="n2" value="retirement" checked={formData.nocReason === 'retirement'} onChange={handleInputChange} />
                <label htmlFor="n2">Retirement</label>

                <p>14. Have You Transferred out from Biometric Attendance System, RHQ, SR</p>
                <input type="radio" name="biometricTransfer" id="b1" value="yes" checked={formData.biometricTransfer === 'yes'} onChange={handleInputChange} />
                <label htmlFor="b1">Yes</label>
                <input type="radio" name="biometricTransfer" id="b2" value="no" checked={formData.biometricTransfer === 'no'} onChange={handleInputChange} />
                <label htmlFor="b2">No</label>

                <p>15. Is there any office dues such as recovery of overpayment, private trunk call charges sent to residence, and recovery on losses</p>
                <input type="radio" name="officeDues" id="o1" value="yes" checked={formData.officeDues === 'yes'} onChange={handleInputChange} />
                <label htmlFor="o1">Yes</label>
                <input type="radio" name="officeDues" id="o2" value="no" checked={formData.officeDues === 'no'} onChange={handleInputChange} />
                <label htmlFor="o2">No</label>

                <p>16. Return of identity card and BCAS AEP No</p>
                <input type="radio" name="identityCardReturn" id="i1" value="yes" checked={formData.identityCardReturn === 'yes'} onChange={handleInputChange} />
                <label htmlFor="i1">Yes</label>
                <input type="radio" name="identityCardReturn" id="i2" value="no" checked={formData.identityCardReturn === 'no'} onChange={handleInputChange} />
                <label htmlFor="i2">No</label>
                <br />
                <button type="button" onClick={() => handleSubmit()}>Approve</button>
            </form>
        </div>
    );
};
