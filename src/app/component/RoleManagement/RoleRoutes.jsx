import roles from "../../../enums/role.enum";
import React from "react";
import RoleList from "./RoleList";

export default [
    {
        path: "/rolelist",
        roles: [roles.ADMIN, roles.USER],
        element: <RoleList/>
    }]