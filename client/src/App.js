import './App.css'
import Login from "./pages/Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeStatus from "./pages/employee/EmployeeStatus";
import AdminStatus from "./pages/admin/AdminStatus";
import AdminReceived from "./pages/admin/AdminReceived";
import {Toaster} from "react-hot-toast";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login/>,
        },
        {
            path: "/employee",
            element: <EmployeeDashboard/>,
        },
        {
            path: "/admin",
            element: <AdminDashboard/>,
        },
        {
            path: "/employee/employeestatus",
            element: <EmployeeStatus/>,
        },
        {
            path: "/admin/adminstatus",
            element: <AdminStatus/>,
        },
        {
            path: "/admin/adminreceived",
            element: <AdminReceived/>,
        }
    ])
    return (
        <>
            <Toaster/>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
