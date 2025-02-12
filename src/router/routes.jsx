import App from "../app/App";
import Login from "../app/component/Login/Login";
// import DashboardRoutes from "../app/pages/Dashboard/DashboardRoutes";
import IndexDashboard from "../app/pages/Dashboard/IndexDashboard";
import {Navigate} from "react-router-dom";
// import AllUsersPage from "../app/component/ManageUsers/AllUsersPage";
import UserList from "../app/component/UserManagement/UserList";
import RoleList from "../app/component/RoleManagement/RoleList";
import DailogPractice from "../app/component/Dailoag/DailogPractice";
import ForgotPassword from "../app/component/Login/ForgotPassword";
import ResetPassword from "../app/component/Login/ResetPassword";
import ManageTask from "../dragAndDrop/ManageTask";

export const ProtectedRoutes = {
    path: "",
    element: <App />,
    children: [
        {
            path: "/dashboard",
            element: <IndexDashboard />, // Example child route
        },
        {
            path: "/userlist", // Test route
            element: <UserList/>,
        },
        {
            path: "/rolelist", // Test route
            element: <RoleList/>,
        },
        {
            path: "/taskManage", // Test route
            element: <ManageTask/>,
        },
        {
            path: "/DailogPractice", // Test route
            element: <DailogPractice/>,
        },
        // Add other child routes here
    ],
    // children: [
    //     ...generateRouteConfig(UserManagementRoutes),
    //     ...generateRouteConfig(DashboardRoutes),
    //     ...generateRouteConfig(TcuManagementRoutes),
    //     ...generateRouteConfig(XtAdminRoutes),
    //     ...generateRouteConfig(TcuFwManagementRoutes),
    // ],
};

export const PublicRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    }
    // ,
    // {
    //     path: "*",
    //     element: <Navigate to="/login" replace />,
    // },
];


