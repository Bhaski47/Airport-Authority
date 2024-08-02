import styles from "../styles/login.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [employee, setEmployee] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (employee) {
            await axios.post("http://localhost:3000/api/employee/login", {email: username, password: password})
                .then((response) => {
                    if (response.data.status_code === 200) {
                        localStorage.removeItem("admin");
                        localStorage.setItem("employee", JSON.stringify(response.data.data));
                        toast.success("Login successful");
                        navigate("/employee")
                    } else if (response.data.status_code === 401) {
                        toast.error(response.data.message);
                    }
                })
                .catch(() => toast.error("Login failed."));
        } else {
            await axios.post("http://localhost:3000/api/admin/login", {email: username, password: password})
                .then((response) => {
                    console.log(response.data.data);
                    if (response.data.status_code === 200) {
                        localStorage.removeItem("employee");
                        localStorage.setItem("admin", JSON.stringify(response.data.data));
                        toast.success("Login successful");
                        navigate("/admin")
                    } else if (response.data.status_code === 401) {
                        toast.error(response.data.message);
                    }
                })
                .catch(() => toast.error("Login failed."));
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
                    <input type="text" placeholder={"Email"} onChange={(e) => setUsername(e.target.value)}
                           value={username}/>
                    <input type="text" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}
                           value={password}/>
                    <input type="submit" value="Login" onClick={handleLogin}/>
                    <p onClick={() => {
                        setEmployee(prev => !prev)
                    }}>Not an <span>{employee ? "Admin" : "Employee"}</span>?</p>
                </div>
            </div>
        </div>
    )
}