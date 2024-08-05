import styles from "../../styles/admin/adminreceived.module.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminReceived() {
    const [isOpen, setIsOpen] = useState(false)
    const [admin, setAdmin] = useState({})
    const [data, setData] = useState([{}])

    useEffect( () => {
        setAdmin(JSON.parse(localStorage.getItem("admin")));
    }, []);

    useEffect( () => {
        const handleApi=async ()=>{
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/employee/send/noc`, {...admin})
                .then((response) => {
                    if (response.data.status_code === 400) {
                        toast.error(response.data.message)
                    }
                    else if(response.data.status_code === 200){
                        setData(response.data.data);
                    }
                    else toast.error(response.data.message);
                })
        }
        handleApi();
    }, [admin]);
    const [employeeData, setEmployeeData] = useState({})

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                {isOpen ? <Modal setIsOpen={setIsOpen} isOpen={isOpen} employee={employeeData} admin={admin}/> :
                    <>
                        <h2 style={{textAlign:"center"}}>Received Applications</h2>
                        {
                            data.map((employee,index) =>
                            <div className={styles.nocBox} key={index} onClick={()=>{
                                setEmployeeData(employee)
                                setIsOpen(true)}
                            }
                            >
                                <h3>{employee.name}</h3>
                                <h3>{employee.department}</h3>
                                <h3>{employee.designation}</h3>
                            </div>
                            )
                        }
                    </>
                }
            </div>
        </div>
    )
}

const Modal = ({ admin, setIsOpen,employee }) => {
        const [formData, setFormData] = useState({
            bookReturn: "",
            gemUser: "",
            gemId: "",
            gemIdTransfer: "",
            applyingDate: "",
            creditSocietyClearance: "",
            pmsSubmission: "",
            accessCardReturn: "",
            registerReturn: "",
            itAssetsReturn: "",
            sapUser: "",
            sapId: "",
            residentialQuarters: "",
            cpppUser: "",
            cpppId: "",
            employeeCardReturn: "",
            nocReason: "",
            biometricTransfer: "",
            officeDues: "",
            identityCardReturn: "",
        });

        const isFormDisabled = {
            bookReturn: false,
            gemUser: false,
            gemId: false,
            gemIdTransfer: false,
            date: false,
            creditSocietyClearance: false,
            pmsSubmission: false,
            accessCardReturn: false,
            registerReturn: false,
            itAssetsReturn: false,
            sapUser: false,
            sapId: false,
            residentialQuarters: false,
            cpppUser: false,
            cpppId: false,
            employeeCardReturn: false,
            nocReason: false,
            biometricTransfer: false,
            officeDues: false,
            identityCardReturn: false,
        };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
    const [input, setInput] = useState("");
        const submitHandler = async(event,num) => {
            event.preventDefault();
            if (num === 2){
                setInput(window.prompt("Please enter your comment:"));
                if (!input) {
                    toast.error("Input cannot be empty. Please enter a comment.");
                    return;
                }
            }

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/admin/approvenoc`,{...employee,num,adminDepartment:admin.department,comment: input})
                .then((response) => {
                    if(response.data.status_code === 200) toast.success(response.data.message);
                    else if(response.data.status_code === 400) toast.error(response.data.message);
                    else toast.error(response.data.message);
                })
        };

        return (
            <form>
                <h1 onClick={()=>setIsOpen(false)}>Close</h1>
                <p>1. Return of books taken from AAI Library</p>
                <input
                    type="radio"
                    name="bookReturn"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.bookReturn === "yes"}
                    disabled={isFormDisabled.bookReturn}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="bookReturn"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.bookReturn === "no"}
                    disabled={isFormDisabled.bookReturn}
                />
                <label>No</label>

                <p>2. Are You A GEM User?</p>
                <input
                    type="radio"
                    name="gemUser"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.gemUser === "yes"}
                    disabled={isFormDisabled.gemUser}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="gemUser"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.gemUser === "no"}
                    disabled={isFormDisabled.gemUser}
                />
                <label>No</label>

                {employee.gemUser === "yes" && (
                    <>
                        <p>Enter your Gem ID</p>
                        <input
                            type="text"
                            name="gemId"
                            value={employee.gemId}
                            onChange={handleInputChange}
                            disabled={isFormDisabled.gemId}
                        />
                        <p>Whether the GEM ID is transferred to the charge taking over official (YES/NO)</p>
                        <input
                            type="text"
                            name="gemIdTransfer"
                            value={employee.gemIdTransfer}
                            onChange={handleInputChange}
                            disabled={isFormDisabled.gemIdTransfer}
                        />
                    </>
                )}

                <p>3. Date of Applying</p>
                <input
                    type="date"
                    name="date"
                    value={formatDate(employee.applyingDate)}
                    id="dateOfApplying"
                    onChange={handleInputChange}
                    disabled={isFormDisabled.date}
                />

                <p>4. Clearance from AAI Thrift Credit society, RHQ, SR</p>
                <select
                    name="creditSocietyClearance"
                    value={employee.creditSocietyClearance}
                    onChange={handleInputChange}
                    disabled={isFormDisabled.creditSocietyClearance}
                >
                    <option value="" disabled>
                        Choose
                    </option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>5. Submission of PMS (Performance Monitoring System)</p>
                <select
                    name="pmsSubmission"
                    value={employee.pmsSubmission}
                    onChange={handleInputChange}
                    disabled={isFormDisabled.pmsSubmission}
                >
                    <option value="" disabled>
                        Choose
                    </option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>6. Return of Access Card</p>
                <select
                    name="accessCardReturn"
                    value={employee.accessCardReturn}
                    onChange={handleInputChange}
                    disabled={isFormDisabled.accessCardReturn}
                >
                    <option value="" disabled>
                        Choose
                    </option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>7. Return of all papers, files, registers, confidential boxes to your concerned department</p>
                <select
                    name="registerReturn"
                    value={employee.registerReturn}
                    onChange={handleInputChange}
                    disabled={isFormDisabled.registerReturn}
                >
                    <option value="" disabled>
                        Choose
                    </option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>8. Whether all the IT assets are given back</p>
                <select
                    name="itAssetsReturn"
                    value={employee.itAssetsReturn}
                    onChange={handleInputChange}
                    disabled={isFormDisabled.itAssetsReturn}
                >
                    <option value="" disabled>
                        Choose
                    </option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <p>9. Do You Possess a SAP Login ID?</p>
                <input
                    type="radio"
                    name="sapUser"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.sapUser === "yes"}
                    disabled={isFormDisabled.sapUser}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="sapUser"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.sapUser === "no"}
                    disabled={isFormDisabled.sapUser}
                />
                <label>No</label>

                {employee.sapUser === "yes" && (
                    <>
                        <p>Enter your SAP ID</p>
                        <input
                            type="text"
                            name="sapId"
                            value={employee.sapId}
                            onChange={handleInputChange}
                            disabled={isFormDisabled.sapId}
                        />
                    </>
                )}

                <p>10. Surrender of Residential Quarters Allotted If Any</p>
                <select
                    name="residentialQuarters"
                    value={employee.residentialQuarters}
                    onChange={handleInputChange}
                    disabled={isFormDisabled.residentialQuarters}
                >
                    <option value="" disabled>
                        Choose
                    </option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                    <option value="DON'T HAVE ANY">DON'T HAVE ANY</option>
                </select>

                <p>11. Are You A CPPP User?</p>
                <input
                    type="radio"
                    name="cpppUser"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.cpppUser === "yes"}
                    disabled={isFormDisabled.cpppUser}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="cpppUser"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.cpppUser === "no"}
                    disabled={isFormDisabled.cpppUser}
                />
                <label>No</label>

                {employee.cpppUser === "yes" && (
                    <>
                        <p>Any tender is under process under your CPPP ID</p>
                        <input
                            type="text"
                            name="cpppId"
                            value={employee.cpppId}
                            onChange={handleInputChange}
                            disabled={isFormDisabled.cpppId}
                        />
                    </>
                )}

                <p>12. Return of AAI Employee Card/Medical Card</p>
                <input
                    type="radio"
                    name="employeeCardReturn"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.employeeCardReturn === "yes"}
                    disabled={isFormDisabled.employeeCardReturn}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="employeeCardReturn"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.employeeCardReturn === "no"}
                    disabled={isFormDisabled.employeeCardReturn}
                />
                <label>No</label>

                <p>13. Reason for Applying NOC</p>
                <input
                    type="radio"
                    name="nocReason"
                    value="transfer"
                    onChange={handleInputChange}
                    checked={employee.nocReason === "transfer"}
                    disabled={isFormDisabled.nocReason}
                />
                <label>Transfer</label>
                <input
                    type="radio"
                    name="nocReason"
                    value="retirement"
                    onChange={handleInputChange}
                    checked={employee.nocReason === "retirement"}
                    disabled={isFormDisabled.nocReason}
                />
                <label>Retirement</label>

                <p>14. Have You Transferred out from Biometric Attendance System, RHQ, SR</p>
                <input
                    type="radio"
                    name="biometricTransfer"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.biometricTransfer === "yes"}
                    disabled={isFormDisabled.biometricTransfer}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="biometricTransfer"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.biometricTransfer === "no"}
                    disabled={isFormDisabled.biometricTransfer}
                />
                <label>No</label>

                <p>15. Is there any office dues such as recovery of overpayment, private trunk call charges sent to residence, and recovery on losses</p>
                <input
                    type="radio"
                    name="officeDues"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.officeDues === "yes"}
                    disabled={isFormDisabled.officeDues}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="officeDues"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.officeDues === "no"}
                    disabled={isFormDisabled.officeDues}
                />
                <label>No</label>

                <p>16. Return of identity card and BCAS AEP No</p>
                <input
                    type="radio"
                    name="identityCardReturn"
                    value="yes"
                    onChange={handleInputChange}
                    checked={employee.identityCardReturn === "yes"}
                    disabled={isFormDisabled.identityCardReturn}
                />
                <label>Yes</label>
                <input
                    type="radio"
                    name="identityCardReturn"
                    value="no"
                    onChange={handleInputChange}
                    checked={employee.identityCardReturn === "no"}
                    disabled={isFormDisabled.identityCardReturn}
                />
                <label>No</label>
                <br/>
                <button onClick={(event)=>submitHandler(event,1)}>Approved</button>
                <button onClick={(event) => submitHandler(event, 2)}>Comment</button>

            </form>
        );
};
