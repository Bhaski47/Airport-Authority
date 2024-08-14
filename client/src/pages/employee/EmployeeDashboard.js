import React, { useEffect, useState } from "react";
import styles from "../../styles/employee/employeedashboard.module.css";
import { useNavigate } from "react-router-dom";
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
          <h2 style={{ textAlign: "center" }}>Employee</h2>
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
    bookReturn: "",
    gemUser: "",
    gemId: "",
    gemIdTransfer: "",
    date: "",
    creditSocietyMember: "",
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
    societyId: "",
    biometricTransfer: "",
    officeDues: "", // Added state for office dues question
    identityCardReturn: "", // Added state for return of identity card and BCAS AEP No.
    pendingEOfficeFiles: "", // Added state for pending E-Office files question
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}api/employee/fetch/noc`,
          { email }
        );
        if (res.data.status_code === 200) {
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
        console.error("Error fetching employee data:", error);
      }
    }
    fetchData();
  }, [email]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

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
      <h1 onClick={handleModalClose}>Close</h1>
      <form className="conditionalform">
        <div className="form-group inline-select">
          <p>1. Return of books taken from AAI Library</p>
          <input
            type="radio"
            name="bookReturn"
            value="yes"
            checked={formData.bookReturn === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="bookReturn"
            value="no"
            checked={formData.bookReturn === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        <div className="form-group inline-select">
          <p>2. Are You A GEM User?</p>
          <input
            type="radio"
            name="gemUser"
            value="yes"
            checked={formData.gemUser === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="gemUser"
            value="no"
            checked={formData.gemUser === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        {formData.gemUser === "yes" && (
          <>
            <p>Enter your Gem ID</p>
            <input
              type="text"
              name="gemId"
              value={formData.gemId}
              onChange={handleInputChange}
            />
            <p>
              Whether the GEM ID is transferred to the charge taking over
              official (YES/NO)
            </p>
            <input
              type="text"
              name="gemIdTransfer"
              value={formData.gemIdTransfer}
              onChange={handleInputChange}
            />
          </>
        )}
        <div className="form-group inline-select">
          <p>3. Date of Applying</p>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group inline-select">
          <p>4. Are you a member of the credit society?</p>
          <input
            type="radio"
            name="creditSocietyMember"
            value="yes"
            checked={formData.creditSocietyMember === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="creditSocietyMember"
            value="no"
            checked={formData.creditSocietyMember === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        {formData.creditSocietyMember === "yes" && (
          <>
            <p>
              Provide the buycon emailId of the official to whom the gem account
              needs to be transferred
            </p>
            <input
              type="text"
              name="societyId"
              value={formData.societyId || ""}
              onChange={handleInputChange}
            />
          </>
        )}

        <div className="form-group inline-select">
          <p>5. Clearance from AAI Thrift Credit society, RHQ, SR</p>
          <select
            name="creditSocietyClearance"
            value={formData.creditSocietyClearance}
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
          <p>6. Submission of PMS (Performance Monitoring System)</p>
          <select
            name="pmsSubmission"
            value={formData.pmsSubmission}
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
          <p>7. Return of Access Card</p>
          <select
            name="accessCardReturn"
            value={formData.accessCardReturn}
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
            8. Return of all papers, files, registers, confidential boxes to
            your concerned department
          </p>
          <select
            name="registerReturn"
            value={formData.registerReturn}
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
          <p>9. Whether all the IT assets are given back</p>
          <select
            name="itAssetsReturn"
            value={formData.itAssetsReturn}
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
          <p>10. Do You Possess a SAP Login ID?</p>
          <input
            type="radio"
            name="sapUser"
            value="yes"
            checked={formData.sapUser === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="sapUser"
            value="no"
            checked={formData.sapUser === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        <div className="form-group inline-select">
          {formData.sapUser === "yes" && (
            <>
              <p>Enter your SAP ID</p>
              <input
                type="text"
                name="sapId"
                value={formData.sapId}
                onChange={handleInputChange}
              />
            </>
          )}
        </div>
        <div className="form-group inline-select">
          <p>11. Surrender of Residential Quarters Allotted If Any</p>
          <select
            name="residentialQuarters"
            value={formData.residentialQuarters}
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
          <p>12. Are You A CPPP User?</p>
          <input
            type="radio"
            name="cpppUser"
            value="yes"
            checked={formData.cpppUser === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="cpppUser"
            value="no"
            checked={formData.cpppUser === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        {formData.cpppUser === "yes" && (
          <>
            <p>Any tender is under process under your CPPP ID</p>
            <input
              type="text"
              name="cpppId"
              value={formData.cpppId}
              onChange={handleInputChange}
            />
          </>
        )}
        <div className="form-group inline-select">
          <p>13. Return of AAI Employee Card/Medical Card</p>
          <input
            type="radio"
            name="employeeCardReturn"
            value="yes"
            checked={formData.employeeCardReturn === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="employeeCardReturn"
            value="no"
            checked={formData.employeeCardReturn === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        <div className="form-group inline-select">
          <p>14. Return of identity card and BCAS AEP No.</p>
          <input
            type="radio"
            name="identityCardReturn"
            value="yes"
            checked={formData.identityCardReturn === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="identityCardReturn"
            value="no"
            checked={formData.identityCardReturn === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        <div className="form-group inline-select">
          <p>15. Whether any E-Office files are pending for action?</p>
          <input
            type="radio"
            name="pendingEOfficeFiles"
            value="yes"
            checked={formData.pendingEOfficeFiles === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="pendingEOfficeFiles"
            value="no"
            checked={formData.pendingEOfficeFiles === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        <div className="form-group inline-select">
          <p>16. Reason for NoC application</p>
          <input
            type="radio"
            name="nocReason"
            value="resignation"
            checked={formData.nocReason === "resignation"}
            onChange={handleInputChange}
          />
          <label>Resignation</label>
          <input
            type="radio"
            name="nocReason"
            value="retirement"
            checked={formData.nocReason === "retirement"}
            onChange={handleInputChange}
          />
          <label>Retirement</label>
        </div>
        <div className="form-group inline-select">
          <p>17. Whether Biometric Transfer Completed?</p>
          <input
            type="radio"
            name="biometricTransfer"
            value="yes"
            checked={formData.biometricTransfer === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="biometricTransfer"
            value="no"
            checked={formData.biometricTransfer === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        <div className="form-group inline-select">
          <p>18. Have you cleared all the dues payable to AAI?</p>
          <input
            type="radio"
            name="officeDues"
            value="yes"
            checked={formData.officeDues === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="officeDues"
            value="no"
            checked={formData.officeDues === "no"}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
        <div className="form-group inline-select">
          <p>
            19. Is there any office due such as recovery of over payment,
            private trunk call charges, sent of residence, and recovery on
            losses?
          </p>
          <input
            type="radio"
            name="officeDuesDetailed"
            value="yes"
            checked={formData.officeDuesDetailed === "yes"}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="officeDuesDetailed"
            value="no"
            checked={formData.officeDuesDetailed === "no"}
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
