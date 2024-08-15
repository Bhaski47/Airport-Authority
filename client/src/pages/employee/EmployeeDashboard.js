import React, {useEffect, useState} from "react";
import styles from "../../styles/employee/employeedashboard.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function EmployeeDashboard() {
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [employee, setEmployee] = useState({});
    const [employeeEmail, setEmployeeEmail] = useState({});

    useEffect(() => {
        setEmployee(JSON.parse(localStorage.getItem("employee")));
        setEmployeeEmail(JSON.parse(localStorage.getItem("employee")).email);
    }, []);

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            {isAdminModalOpen ? (
                <FormComponent
                    setIsEmployeeModalOpen={setIsAdminModalOpen}
                    email={employeeEmail}
                />
            ) : (
                <div className={styles.dataContainer}>
                    <h2 style={{textAlign: "center"}}>Employee</h2>
                    <div className={styles.status}>
                        <h3>Name: {employee.name}</h3>
                        <h3>Dept: {employee.department}</h3>
                        <h3>Designation: {employee.designation}</h3>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={() => setIsAdminModalOpen(true)}>
                            NOC - Apply
                        </button>
                        <button onClick={() => navigate("/employee/employeestatus")}>
                            NOC - Status
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const FormComponent = ({ setIsEmployeeModalOpen, email }) => {
    const [formData, setFormData] = useState({
        email: email,
        bookReturn_lang: "",
        gemUser_it: "",
        gemId_it: "",
        gemIdTransfer_it: "",
        date: "",
        creditSocietyMember_society: "",
        creditSocietyClearance: "",
        pmsSubmission_stores: "",
        accessCardReturn: "",
        registerReturn_stores: "",
        itAssetsReturn_it: "",
        sapUser_it: "",
        sapId_it: "",
        residentialQuarters_hr: "",
        cpppUser_it: "",
        cpppId_it: "",
        employeeCardReturn_hr: "",
        nocReason: "",
        societyId_society: "",
        biometricTransfer_hr: "",
        officeDuesDetailed_finance: "",
        identityCardReturn_security: "",
        pendingEOfficeFiles_it: "",
    });

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}api/employee/fetch/noc`,
                    { email }
                );
                if (isMounted && res.data.status_code === 200) {
                    const applyingDateString = res.data.data.applyingDate
                        ? new Date(res.data.data.applyingDate).toISOString().split("T")[0]
                        : "";

                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        ...res.data.data,
                        date: applyingDateString,
                    }));
                }
            } catch (error) {
                if (isMounted) console.error("Error fetching employee data:", error);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [email]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleModalClose = () => {
        setIsEmployeeModalOpen((prevData) => !prevData);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}api/employee/create/noc`,
                formData
            );
            if (res.data.status_code === 200) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while submitting the form.");
        }
    };

    return (
        <div>
            <h4 onClick={handleModalClose}>Close</h4>
            <form className="conditionalform">
                <h1 style={{textAlign:"center"}}>AAI Form</h1>
                <div className="form-group inline-select">
                    <p>1. Return of books taken from AAI Library</p>
                    <input
                        type="radio"
                        name="bookReturn_lang"
                        value="yes"
                        checked={formData.bookReturn_lang === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="bookReturn_lang"
                        value="no"
                        checked={formData.bookReturn_lang === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                <div className="form-group inline-select">
                    <p>2. Are You A GEM User?</p>
                    <input
                        type="radio"
                        name="gemUser_it"
                        value="yes"
                        checked={formData.gemUser_it === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="gemUser_it"
                        value="no"
                        checked={formData.gemUser_it === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                {formData.gemUser_it === "yes" && (
                    <>
                        <p>Enter your Gem ID</p>
                        <input
                            type="text"
                            name="gemId_it"
                            value={formData.gemId_it}
                            onChange={handleInputChange}
                        />
                        <p>
                            Whether the GEM ID is transferred to the charge taking over
                            official (YES/NO)
                        </p>
                        <input
                            type="text"
                            name="gemIdTransfer_it"
                            value={formData.gemIdTransfer_it}
                            onChange={handleInputChange}
                        />
                    </>
                )}
                <div className="form-group inline-select">
                    <p>03. Are you a member of the credit society?</p>
                    <input
                        type="radio"
                        name="creditSocietyMember_society"
                        value="yes"
                        checked={formData.creditSocietyMember_society === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="creditSocietyMember_society"
                        value="no"
                        checked={formData.creditSocietyMember_society === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                {formData.creditSocietyMember_society === "yes" && (
                    <>
                        <p>
                            Provide the buycon emailId of the official to whom the gem account
                            needs to be transferred
                        </p>
                        <input
                            type="text"
                            name="societyId_society"
                            value={formData.societyId_society}
                            onChange={handleInputChange}
                        />
                    </>
                )}

                <div className="form-group inline-select">
                    <p>04. Submission of PMS (Performance Monitoring System)</p>
                    <select
                        name="pmsSubmission_stores"
                        value={formData.pmsSubmission_stores}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Choose
                        </option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                <div className="form-group inline-select">
                    <p>
                        05. Return of all papers, files, registers, confidential boxes to
                        your concerned department
                    </p>
                    <select
                        name="registerReturn_stores"
                        value={formData.registerReturn_stores}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Choose
                        </option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                <div className="form-group inline-select">
                    <p>06. Whether all the IT assets are given back</p>
                    <select
                        name="itAssetsReturn_it"
                        value={formData.itAssetsReturn_it}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Choose
                        </option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
                <div className="form-group inline-select">
                    <p>07. Do You Possess a SAP Login ID?</p>
                    <input
                        type="radio"
                        name="sapUser_it"
                        value="yes"
                        checked={formData.sapUser_it === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="sapUser_it"
                        value="no"
                        checked={formData.sapUser_it === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                <div className="form-group inline-select">
                    {formData.sapUser_it === "yes" && (
                        <>
                            <p>Enter your SAP ID</p>
                            <input
                                type="text"
                                name="sapId_it"
                                value={formData.sapId_it}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                </div>
                <div className="form-group inline-select">
                    <p>08. Surrender of Residential Quarters Allotted If Any</p>
                    <select
                        name="residentialQuarters_hr"
                        value={formData.residentialQuarters_hr}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Choose
                        </option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                        <option value="DON'T HAVE ANY">DON'T HAVE ANY</option>
                    </select>
                </div>
                <div className="form-group inline-select">
                    <p>09. Are You A CPPP User?</p>
                    <input
                        type="radio"
                        name="cpppUser_it"
                        value="yes"
                        checked={formData.cpppUser_it === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="cpppUser_it"
                        value="no"
                        checked={formData.cpppUser_it === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                {formData.cpppUser_it === "yes" && (
                    <>
                        <p>Any tender is under process under your CPPP ID</p>
                        <input
                            type="text"
                            name="cpppId_it"
                            value={formData.cpppId_it}
                            onChange={handleInputChange}
                        />
                    </>
                )}
                <div className="form-group inline-select">
                    <p>10. Return of AAI Employee Card/Medical Card</p>
                    <input
                        type="radio"
                        name="employeeCardReturn_hr"
                        value="yes"
                        checked={formData.employeeCardReturn_hr === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="employeeCardReturn_hr"
                        value="no"
                        checked={formData.employeeCardReturn_hr === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                <div className="form-group inline-select">
                    <p>11. Reason for Applying NOC</p>
                    <input
                        type="radio"
                        name="nocReason"
                        value="Transfer"
                        checked={formData.nocReason === "Transfer"}
                        onChange={handleInputChange}
                    />
                    <label>Transfer</label>
                    <input
                        type="radio"
                        name="nocReason"
                        value="Retirement"
                        checked={formData.nocReason === "Retirement"}
                        onChange={handleInputChange}
                    />
                    <label>Retirement</label>
                </div>
                <div className="form-group inline-select">
                    <p>12. Have You Transferred out from Biometric Attendance System RHQ, SR</p>
                    <input type="radio" name="biometricTransfer_hr" id="biometricYes" value="yes"
                           checked={formData.biometricTransfer_hr === "yes"} onChange={handleInputChange}/>
                    <label htmlFor="biometricYes">Yes</label>
                    <input type="radio" name="biometricTransfer_hr" id="biometricNo" value="no"
                           checked={formData.biometricTransfer_hr === "no"} onChange={handleInputChange}/>
                    <label htmlFor="biometricNo">No</label>
                </div>
                <div className="form-group inline-select">
                    <p>
                        13. Is there any office due such as recovery of over payment,
                        private trunk call charges, sent of residence, and recovery on
                        losses?
                    </p>
                    <input
                        type="radio"
                        name="officeDuesDetailed_finance"
                        value="yes"
                        checked={formData.officeDuesDetailed_finance === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="officeDuesDetailed_finance"
                        value="no"
                        checked={formData.officeDuesDetailed_finance === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                <div className="form-group inline-select">
                    <p>14. Return of identity card and BCAS AEP No.</p>
                    <input
                        type="radio"
                        name="identityCardReturn_security"
                        value="yes"
                        checked={formData.identityCardReturn_security === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="identityCardReturn_security"
                        value="no"
                        checked={formData.identityCardReturn_security === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                <div className="form-group inline-select">
                    <p>15. Whether any E-Office files are pending for action?</p>
                    <input
                        type="radio"
                        name="pendingEOfficeFiles_it"
                        value="yes"
                        checked={formData.pendingEOfficeFiles_it === "yes"}
                        onChange={handleInputChange}
                    />
                    <label>Yes</label>
                    <input
                        type="radio"
                        name="pendingEOfficeFiles_it"
                        value="no"
                        checked={formData.pendingEOfficeFiles_it === "no"}
                        onChange={handleInputChange}
                    />
                    <label>No</label>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};
