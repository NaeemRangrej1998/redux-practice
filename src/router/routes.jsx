import React from 'react';
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
import UserManagementRoutes from "../app/pages/UserManagement/UserManagementRoutes";
import TcuManagementRoutes from "../app/pages/TcuManagement/TcuManagementRoutes";
import Protected from "./Protected";
import DashboardRoutes from "../app/pages/Dashboard/DashboardRoutes";
import XtAdminRoutes from "../app/pages/XtAdmin/XtAdminRoutes";
import TcuFwManagementRoutes from "../app/pages/TcuFwManagement/TcuFwManagementRoutes";
import ManageUserRoutes from "../app/component/ManageUsers/ManageUserRoutes";
import RoleRoutes from "../app/component/RoleManagement/RoleRoutes";

export const ProtectedRoutes = {
    path: "",
    element: <App />,
    children: [
        // {
        //     path: "/userlist", // Test route
        //     element: <UserList/>,
        // },
        // {
        //     path: "/rolelist", // Test route
        //     element: <RoleList/>,
        // },
        // {
        //     path: "/taskManage", // Test route
        //     element: <ManageTask/>,
        // },
        // {
        //     path: "/DailogPractice", // Test route
        //     element: <DailogPractice/>,
        // },
        ...generateRouteConfig(UserManagementRoutes),
        ...generateRouteConfig(DashboardRoutes),
        ...generateRouteConfig(TcuManagementRoutes),
        ...generateRouteConfig(XtAdminRoutes),
        ...generateRouteConfig(TcuFwManagementRoutes),
        ...generateRouteConfig(ManageUserRoutes),
        ...generateRouteConfig(RoleRoutes)
        // Add other child routes here
    ],
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
];


export function generateRouteConfig(routes, roles) {
    const routesConfig = [];
    routes.forEach((route) => {
        const routeObj = {};
        routeObj.path = route.path;

        if (route.element) {
            routeObj.element = (
                <Protected path={route.path} roles={route.roles || roles}>
                    {route.element}
                </Protected>
            );
        }

        if (route.children) {
            routeObj.children = generateRouteConfig(route.children, route.roles);
        }

        routesConfig.push(routeObj);
    });
    return routesConfig;
}