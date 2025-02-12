import rolesEnum from "../../../enums/role.enum";
import React from 'react';
import UserList from "./components/User/UserList";
import UserGroupListing from "./components/UserGroup/UserGroupListing";
import TcuAssociationListing from "./components/TcuAssociation/TcuAssociationListing";

export default   
    [{
      path: "/user-management",
      // roles: [roles.ADMIN],
      children: [
        {
          path: '/user-management/user-list',
          element: <UserList/>,
          roles: [rolesEnum.XT_ADMIN,rolesEnum.CUSTOMER_ADMIN],
        },
        {
          path: '/user-management/user-group',
          element: <UserGroupListing />,
          roles: [rolesEnum.XT_ADMIN,rolesEnum.CUSTOMER_ADMIN],
        },
        {
          path: '/user-management/tcu-association',
          element: <TcuAssociationListing />,
          roles: [rolesEnum.XT_ADMIN,rolesEnum.CUSTOMER_ADMIN],
        },
      ],
    }]
  