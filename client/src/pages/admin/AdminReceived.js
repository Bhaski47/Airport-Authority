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

const Modal = ({ admin, setIsOpen, employee }) => {
    const [formData, setFormData] = useState({
        bookReturn_lang: employee.bookReturn_lang || "",
        gemUser_it: employee.gemUser_it || "",
        gemId_it: employee.gemId_it || "",
        gemIdTransfer_it: employee.gemIdTransfer_it || "",
        date: employee.date || "",
        creditSocietyMember_society: employee.creditSocietyMember_society || "",
        creditSocietyClearance: employee.creditSocietyClearance || "",
        pmsSubmission_stores: employee.pmsSubmission_stores || "",
        accessCardReturn: employee.accessCardReturn || "",
        registerReturn_stores: employee.registerReturn_stores || "",
        itAssetsReturn_it: employee.itAssetsReturn_it || "",
        sapUser_it: employee.sapUser_it || "",
        sapId_it: employee.sapId_it || "",
        residentialQuarters_hr: employee.residentialQuarters_hr || "",
        cpppUser_it: employee.cpppUser_it || "",
        cpppId_it: employee.cpppId_it || "",
        employeeCardReturn_hr: employee.employeeCardReturn_hr || "",
        nocReason: employee.nocReason || "",
        societyId_society: employee.societyId_society || "",
        biometricTransfer_hr: employee.biometricTransfer_hr || "",
        officeDuesDetailed_finance: employee.officeDuesDetailed_finance || "",
        identityCardReturn_security: employee.identityCardReturn_security || "",
        pendingEOfficeFiles_it: employee.pendingEOfficeFiles_it || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = async (event, num) => {
        event.preventDefault();
        if (num === 1) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/admin/approvenoc`, {
                    ...employee,
                    num,
                    adminDepartment: admin.department,
                });

                if (response.data.status_code === 200) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("An error occurred while submitting the form.");
                console.error("API Error:", error);
            }
        }
        if (num === 2) {
            const userInput = window.prompt("Please enter your comment:");

            if (userInput !== null && userInput.trim() !== "") {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/admin/approvenoc`, {
                        ...employee,
                        num,
                        adminDepartment: admin.department,
                        comment: userInput,
                    });

                    if (response.data.status_code === 200) {
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
                } catch (error) {
                    toast.error("An error occurred while submitting the form.");
                }
            } else {
                toast.error("Input cannot be empty. Please enter a comment.");
            }
        }
    };

    return (
        <form className="conditionalform">
            <h4 onClick={() => setIsOpen(false)}>Close</h4>
            <h1 style={{ textAlign: "center" }}>AAI Form</h1>
            <div className="form-group inline-select">
                <p>1. Return of books taken from AAI Library</p>
                <input disabled
                    type="radio"
                    name="bookReturn_lang"
                    value="yes"
                    checked={formData.bookReturn_lang === "yes"}
                    onChange={handleInputChange}
                />
                <label>Yes</label>
                <input disabled
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
                <input disabled
                    type="radio"
                    name="gemUser_it"
                    value="yes"
                    checked={formData.gemUser_it === "yes"}
                    onChange={handleInputChange}
                />
                <label>Yes</label>
                <input disabled
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
                    <input disabled
                        type="text"
                        name="gemId_it"
                        value={formData.gemId_it}
                        onChange={handleInputChange}
                    />
                    <p>
                        Whether the GEM ID is transferred to the charge taking over
                        official (YES/NO)
                    </p>
                    <input disabled
                        type="text"
                        name="gemIdTransfer_it"
                        value={formData.gemIdTransfer_it}
                        onChange={handleInputChange}
                    />
                </>
            )}
            <div className="form-group inline-select">
                <p>03. Are you a member of the credit society?</p>
                <input disabled
                    type="radio"
                    name="creditSocietyMember_society"
                    value="yes"
                    checked={formData.creditSocietyMember_society === "yes"}
                    onChange={handleInputChange}
                />
                <label>Yes</label>
                <input disabled
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
                    <input disabled
                        type="text"
                        name="societyId_society"
                        value={formData.societyId_society}
                        onChange={handleInputChange}
                    />
                </>
            )}

            <div className="form-group inline-select">
                <p>04. Submission of PMS (Performance Monitoring System)</p>
                <select disabled
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
                <select disabled
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
                <select disabled
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
                <input disabled
                    type="radio"
                    name="sapUser_it"
                    value="yes"
                    checked={formData.sapUser_it === "yes"}
                    onChange={handleInputChange}
                />
                <label>Yes</label>
                <input disabled
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
                        <input disabled
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
                <select disabled
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
                <p>09. Whether CP & PP Accounts Are Disabled?</p>
                <input disabled
                    type="radio"
                    name="cpppUser_it"
                    value="yes"
                    checked={formData.cpppUser_it === "yes"}
                    onChange={handleInputChange}
                />
                <label>Yes</label>
                <input disabled
                    type="radio"
                    name="cpppUser_it"
                    value="no"
                    checked={formData.cpppUser_it === "no"}
                    onChange={handleInputChange}
                />
                <label>No</label>
            </div>
            <div className="form-group inline-select">
                {formData.cpppUser_it === "yes" && (
                    <>
                        <p>Enter your CP & PP ID</p>
                        <input disabled
                            type="text"
                            name="cpppId_it"
                            value={formData.cpppId_it}
                            onChange={handleInputChange}
                        />
                    </>
                )}
            </div>
            <div className="form-group inline-select">
                <p>10. Have you surrendered your Employee Card?</p>
                <input disabled
                    type="radio"
                    name="employeeCardReturn_hr"
                    value="yes"
                    checked={formData.employeeCardReturn_hr === "yes"}
                    onChange={handleInputChange}
                />
                <label>Yes</label>
                <input disabled
                    type="radio"
                    name="employeeCardReturn_hr"
                    value="no"
                    checked={formData.employeeCardReturn_hr === "no"}
                    onChange={handleInputChange}
                />
                <label>No</label>
            </div>
            <div className="form-group inline-select">
                <p>11. Provide NOC Reason If Any</p>
                <input disabled
                    type="text"
                    name="nocReason"
                    value={formData.nocReason}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group inline-select">
                <p>12. Biometric Clearance Has Been Taken?</p>
                <select disabled
                    name="biometricTransfer_hr"
                    value={formData.biometricTransfer_hr}
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
                <p>13. Detailed Clearance of All Office Dues?</p>
                <select disabled
                    name="officeDuesDetailed_finance"
                    value={formData.officeDuesDetailed_finance}
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
                <p>14. Have you surrendered the Identity Card to Security Department?</p>
                <select disabled
                    name="identityCardReturn_security"
                    value={formData.identityCardReturn_security}
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
                <p>15. Clearance of pending E-Office Files?</p>
                <select disabled
                    name="pendingEOfficeFiles_it"
                    value={formData.pendingEOfficeFiles_it}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>
                        Choose
                    </option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
            </div>
            <button onClick={(event) => submitHandler(event, 1)}>Approved</button>
            <button onClick={(event) => submitHandler(event, 2)}>Comment</button>
        </form>
    );
};
