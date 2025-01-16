import React from 'react';
import {
  ProductAuthenticationLog,
 ProductedSettings,
  ProductedClientList,
  ProductedCreateCustomer,
  ProductedLog
} from '../optimisedRoutes/lazyRoutes';
import UserLayout from '../../layout/UserLayout';
const userRoutes = [
  {
    element: (
        <UserLayout />
    ),
    children: [
      { path: '/', element: <ProductedClientList /> },
      { path: '/customers', element: <ProductedClientList /> },
      { path: '/customers/add-customer', element: <ProductedCreateCustomer /> },
    
      {
        path: '/settings',
        element: <ProductedSettings />,
        children: [
          { path: 'authentication-log', element: <ProductAuthenticationLog /> },
          { path: 'activity-log', element: <ProductedLog /> }
        ],
      },
    ],
  },
];

export default userRoutes;