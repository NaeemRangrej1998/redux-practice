import roles from "../../../enums/role.enum";
import React from "react";
import CardImpl from "./Card";
export default [
    {
        path: "/card",
        roles: [roles.ADMIN, roles.USER],
        element: <CardImpl/>
    }]