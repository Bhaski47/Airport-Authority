import React, {useEffect, useState} from 'react';
import styles from "../../styles/employee/employeedashboard.module.css";
import {useNavigate} from "react-router-dom";

export default function EmployeeDashboard() {
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        setEmployee(JSON.parse(localStorage.getItem("employee")));
    }, []);

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            {isAdminModalOpen ? <ConditionalAdminForm setIsAdminModalOpen={setIsAdminModalOpen}/> :
                <div className={styles.dataContainer}>
                    <h2 style={{textAlign: "center"}}>Employee</h2>
                    <div className={styles.status}>
                        <h3>Name: {employee.name}</h3>
                        <h3>Dept: {employee.department}</h3>
                        <h3>Designation: {employee.designation}</h3>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={() => setIsAdminModalOpen(true)}>NOC - Apply</button>
                        <button onClick={() => navigate("/admin/adminstatus")}>NOC - Status</button>
                    </div>
                </div>
            }
        </div>
    );
}

const ConditionalAdminForm = ({setIsAdminModalOpen}) => {
    const [showRelatedQuestions, setShowRelatedQuestions] = useState(false);
    const [response, setResponse] = useState('');
    const [gemId, setGemId] = useState('');
    const [sapId, setsapId] = useState('');
    const [cpppId, setcpppId] = useState('');
    const handleResponseChange = (e) => {
        setResponse(e.target.value);
        setShowRelatedQuestions(e.target.value === 'yes');
    };
    const handleGemIdChange = (e) => {
        setGemId(e.target.value);
    };
    const handlesapIdChange = (e) => {
        setsapId(e.target.value);
    };
    const handlecpppIdChange = (e) => {
        setcpppId(e.target.value);
    };
    return (
        <div>
            <h1 onClick={() => setIsAdminModalOpen(false)}>Close</h1>
            <p> 1.Return of books taken from AAI Library</p>
            <input type="radio" name="BOOK" id="e1" value="yes"/>
            <label for="e1">Yes</label>
            <input type="radio" name="BOOK" id="e2" value="no"/>
            <label for="e2">No</label>
            <p> 2.Are You A GEM User?</p>
            <input type="radio" name="proceed" value="yes"
                   onChange={handleResponseChange}/>
            <label>Yes</label>
            <input type="radio" name="proceed" value="no"
                   onChange={handleResponseChange}/>
            <label>No</label>
            {showRelatedQuestions && (
                <div>
                    <p> Enter your Gem ID</p>
                    <input type="text" value={gemId} onChange={handleGemIdChange}/>
                </div>
            )}
            {showRelatedQuestions && (
                <div>
                    <p> Whether the GEM ID is transferred to the charge taking over
                        official (YES/NO)</p>
                    <input type="text" value={gemId} onChange={handleGemIdChange}/>
                </div>
            )}
            <p> 3.Date of Applying</p>
            <input type="date" id="dateOfApplying"/>
            {/* Remaining input elements go here */}
            <p>4.Clearance from AAI Thrift Credit society,RHQ,SR</p>
            <select name="Credit Society">
                <option selected disabled>Choose</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            <p>5.Submission of PMS (Performance Monitoring System)</p>
            <select name="Credit Society">
                <option selected disabled>Choose</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            <p>6.Return of Access Card</p>
            <select name="Access Card">
                <option selected disabled>Choose</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            <p>7.Return of all papers,files.registers,confidential boxes to
                your concerned department</p>
            <select name="registers">
                <option selected disabled>Choose</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            <p>8.Whether all the IT assets are given back</p>
            <select name="assets">
                <option selected disabled>Choose</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
            <p>9.Do You Posses a SAP Login ID?</p>
            <input type="radio" name="proceed" value="yes"
                   onChange={handleResponseChange}/>
            <label>Yes</label>
            <input type="radio" name="proceed" value="no"
                   onChange={handleResponseChange}/>
            <label>No</label>
            {showRelatedQuestions && (
                <div>
                    <p>Enter your SAP ID</p>
                    <input type="text" value={sapId} onChange={handlesapIdChange}/>
                </div>
            )}
            <p>10.Surrender of Residential Quarters Alloted If Any</p>
            <select name="residential quarters">
                <option selected disabled>Choose</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
                <option value="DON'T HAVE ANY">DON'T HAVE ANY</option>
            </select>
            <p>11.Are You A CPPP User?</p>
            <input type="radio" name="proceed" value="yes"
                   onChange={handleResponseChange}/>
            <label>Yes</label>
            <input type="radio" name="proceed" value="no"
                   onChange={handleResponseChange}/>
            <label>No</label>
            {showRelatedQuestions && (
                <div>
                    <p>Any tender is under process under your CPPP ID</p>
                    <input type="text" value={cpppId} onChange={handlecpppIdChange}
                    />
                </div>
            )}
            <p>12.Return of AAI Employee Card/Medical Card</p>
            <input type="radio" name="card" id="e1" value="yes"/>
            <label for="e1">Yes</label>
            <input type="radio" name="card" id="e2" value="no"/>
            <label for="e2">No</label>
            <p>13.Reason for Applying NOC</p>
            <input type="radio" name="apply" id="e1" value="transfer"/>
            <label for="e1">Transfer</label>
            <input type="radio" name="apply" id="e2" value="retirement"/>
            <label for="e2">Retirement</label>
            <p>14.Have You Transferred out from Biometric Attendance System
                RHQ,SR</p>
            <input type="radio" name="card" id="e1" value="yes"/>
            <label for="e1">Yes</label>
            <input type="radio" name="card" id="e2" value="no"/>
            <label for="e2">No</label>
            <p>15.Is there any office due's such as recovery of over payment
                private
                trunk call charges sent of residence and recovery on losses
            </p>
            <input type="radio" name="card" id="e1" value="yes"/>
            <label for="e1">Yes</label>
            <input type="radio" name="card" id="e2" value="no"/>
            <label for="e2">No</label>
            <p>16.Return of identity card and BCAS AEP No</p>
            <input type="radio" name="card" id="e1" value="yes"/>
            <label for="e1">Yes</label>
            <input type="radio" name="card" id="e2" value="no"/>
            <label for="e2">No</label>
            <br></br>
            <button type="submit">Submit</button>
        </div>
    );
};