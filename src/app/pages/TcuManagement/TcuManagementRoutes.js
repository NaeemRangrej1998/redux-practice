import rolesEnum from '../../../enums/role.enum';
import React from 'react';

import TcuList from './components/TcuList/TcuList';
import TcuGroupListing from './components/TcuGroup/TcuGroupListing';
import roleEnum from '../../../enums/role.enum';

export default [
  {
    path: '/tcu-management',
    // roles: [roles.ADMIN],
    children: [
      {
        path: '/tcu-management/tcu-list',
        element: <TcuList />,
        roles: [
          rolesEnum.XT_ADMIN,
          rolesEnum.CUSTOMER_ADMIN,
          rolesEnum.ADVANCE_USER,
          rolesEnum.STANDARD_USER,
          roleEnum.XT_STANDARD_USER,
          roleEnum.XT_ADVANCE_USER,
        ],
      },
      {
        path: '/tcu-management/tcu-group',
        element: <TcuGroupListing />,
        roles: [
          rolesEnum.XT_ADMIN,
          rolesEnum.CUSTOMER_ADMIN,
          rolesEnum.ADVANCE_USER,
          rolesEnum.STANDARD_USER,
          roleEnum.XT_STANDARD_USER,
          roleEnum.XT_ADVANCE_USER,
        ],
      },
    ],
  },
];
