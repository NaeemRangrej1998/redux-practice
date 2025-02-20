import roles from "../../../enums/role.enum";
import roleEnum from "../../../enums/role.enum";
import Dashboard from "../../pages/Dashboard/components/Dashboard";
import React from "react";

export default [
    {
        path: "/sub-dashboard",
        roles: [roles.ADMIN, roles.USER],
        element: <Dashboard/>
    }]