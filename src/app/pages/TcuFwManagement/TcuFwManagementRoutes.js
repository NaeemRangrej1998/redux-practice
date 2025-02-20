
import rolesEnum from "../../../enums/role.enum";
import React from 'react';
import TcuFwList from "./components/TcuFwList";
import TcuFwUpgrade from "./components/TcuFwUpgrade";
import TcuFwUpgradeHistory from "./components/TcuFwUpgradeHistory/TcuFwUpgradeHistory";
import roleEnum from "../../../enums/role.enum";

export default   
    [{
      path: "/tcu-fw-management",
      // roles: [roles.ADMIN],
      children: [
        {
          path: '/tcu-fw-management/tcu-fw-list',
          element: <TcuFwList/>,
          roles: [rolesEnum.XT_ADMIN, rolesEnum.CUSTOMER_ADMIN, rolesEnum.ADVANCE_USER,roleEnum.XT_ADVANCE_USER],
        },
        {
          path: '/tcu-fw-management/tcu-fw-upgrade',
          element: <TcuFwUpgrade />,
          roles: [rolesEnum.XT_ADMIN, rolesEnum.CUSTOMER_ADMIN, rolesEnum.ADVANCE_USER,roleEnum.XT_ADVANCE_USER],
        },
        {
          path: '/tcu-fw-management/tcu-upgrade-history',
          element: <TcuFwUpgradeHistory />,
          roles: [rolesEnum.XT_ADMIN, rolesEnum.CUSTOMER_ADMIN, rolesEnum.ADVANCE_USER,roleEnum.XT_ADVANCE_USER],
        }
      ],
    }]
  