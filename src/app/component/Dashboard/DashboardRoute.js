import roles from "../../../enums/role.enum";
import React from "react";
import CardImpl from "./Card";
import {Analitics} from "./Analitics";
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
]