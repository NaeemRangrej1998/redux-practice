import roles from "../../../enums/role.enum";
import React from 'react';
import DashIndex from "./components";
import Dashboard from "./components/Dashboard";
import roleEnum from "../../../enums/role.enum";
import Layout from "../../Layout";


export default [{
    path: "/sub-dashboard",
    roles: [roles.XT_ADMIN, roleEnum.CUSTOMER_ADMIN, roleEnum.ADVANCE_USER, roleEnum.STANDARD_USER, roleEnum.XT_STANDARD_USER, roleEnum.XT_ADVANCE_USER,roleEnum.ADMIN],
    element: <Dashboard/>
    },
    {
        path: "/dashboard",
        roles: [roles.XT_ADMIN, roleEnum.CUSTOMER_ADMIN, roleEnum.ADVANCE_USER, roleEnum.STANDARD_USER, roleEnum.XT_STANDARD_USER, roleEnum.XT_ADVANCE_USER,roleEnum.ADMIN],
        element: <DashIndex/>

    },
    {
        path: "/layout",
        roles: [roles.XT_ADMIN, roleEnum.CUSTOMER_ADMIN, roleEnum.ADVANCE_USER, roleEnum.STANDARD_USER, roleEnum.XT_FACTORY_USER, roleEnum.XT_STANDARD_USER, roleEnum.XT_ADVANCE_USER],
        element: <Layout/>

    }
]
