import roles from "../../../enums/role.enum";
import React from "react";
import CardImpl from "./Card";
import {Analitics} from "./Analitics";
import MuiTable from "./MuiTable";
export default [
    {
        path: "/card",
        roles: [roles.ADMIN, roles.USER],
        element: <CardImpl/>
    },
    {
        path: "/analytics",
        roles: [roles.ADMIN, roles.USER],
        element: <Analitics/>
    },
    {
        path: "/page",
        roles: [roles.ADMIN, roles.USER],
        element: <MuiTable/>
    },
]