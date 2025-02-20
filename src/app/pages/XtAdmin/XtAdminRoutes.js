
import rolesEnum from "../../../enums/role.enum";
import React from 'react';
import CustomerReg from "./components/customerReg/CustomerReg";
import TcuWhitelisting from "./components/TcuWhitelisting/TcuWhitelisting";

export default   
    [{
      path: "/xt-admin",
      // roles: [roles.ADMIN],
      children: [
        {
          path: '/xt-admin/tcu-whitelisting',
          element: <TcuWhitelisting/>,
          roles: [rolesEnum.XT_ADMIN, rolesEnum.XT_FACTORY_USER],
        },
        {
          path: '/xt-admin/customer-registration',
          element: <CustomerReg />,
          roles: [rolesEnum.XT_ADMIN],
        }
      ],
    }]
  