import App from "../app/App";
import Login from "../app/component/Login/Login";
// import DashboardRoutes from "../app/pages/Dashboard/DashboardRoutes";
import IndexDashboard from "../app/pages/Dashboard/IndexDashboard";
import {Navigate} from "react-router-dom";
// import AllUsersPage from "../app/component/ManageUsers/AllUsersPage";
import UserList from "../app/component/UserManagement/UserList";
import RoleList from "../app/component/RoleManagement/RoleList";
import DailogPractice from "../app/component/Dailoag/DailogPractice";

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
        path: "*",
        element: <Navigate to="/login" replace />,
    },
];


