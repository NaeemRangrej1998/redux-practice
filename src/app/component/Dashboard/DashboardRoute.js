import roles from "../../../enums/role.enum";
import React from "react";
import CardImpl from "./Card";
import {Analitics} from "./Analitics";
import MuiTable from "./MuiTable";
export default [
    {
        path: "/card",
        roles: [roles.SUPER_ADMIN],
        element: <CardImpl/>
    },
    {
        path: "/analytics",
        roles: [roles.SUPER_ADMIN],
        element: <Analitics/>
    },
    {
        path: "/page",
        roles: [roles.SUPER_ADMIN],
        element: <MuiTable/>
    },
]