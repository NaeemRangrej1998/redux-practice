import roles from "../../../enums/role.enum";
import React from "react";
import UserList from "../UserManagement/UserList";

export default [
    {
        path: "/userlist",
        roles: [roles.ADMIN, roles.USER],
        element: <UserList/>
    }]