import styles from "../styles/login.module.css";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
    const [employee,setEmployee] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        employee: true,
        email: "",
        department: "",
        designation: "",
        age: 0
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'department' ? value.toUpperCase() : value
        }));
    };
    const validateForm = () => {
        let isValid = true;

        if (!formData.name) {
            isValid = false;
        }

        if (!formData.password) {
            isValid = false;
        }

        if (!formData.email) {
            isValid = false;
        }

        if (!formData.department) {
            isValid = false;
        }

        if (!formData.designation) {
            isValid = false;
        }

        if (formData.age <= 0) {
            isValid = false;
        }
        if(!isValid) toast.error("Fill all the details")
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (employee && validateForm()) {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/employee/create/employee`, {...formData})
                .then((response) => {
                    if (response.data.status_code === 200) {
                        toast.success(response.data.message);
                    } else if (response.data.status_code === 401) {
                        toast.error(response.data.message);
                    }
                })
                .catch(() => toast.error("Failed to create."));
        } else if(!employee && validateForm()) {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/admin/create/admin`, {...formData})
                .then((response) => {
                    if (response.data.status_code === 200) {
                        toast.success(response.data.message);
                    } else if (response.data.status_code === 401) {
                        toast.error(response.data.message);
                    }
                })
                .catch(() => toast.error("Failed to create."));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.partition}>
                <div className={styles.imageContainer}>
                    <img src="https://i0.wp.com/www.govtjobs.co.in/wp-content/uploads/2018/06/aai-logo.jpg"
                         width={"70%"} alt="Airport Authority"/>
                </div>
                <div className={styles.loginContainer}>
                    <h1>{employee ? "Employee" : "Admin"}</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            placeholder="Department"
                        />
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            placeholder="Designation"
                        />
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Age"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <p onClick={() => {
                        setEmployee(prev => !prev)
                    }}>Not an <span>{employee ? "Admin" : "Employee"}</span>?</p>
                </div>
            </div>
        </div>
    )
}