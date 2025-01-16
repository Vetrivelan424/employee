// LazyRoutes.js
import React, { lazy, Suspense } from 'react';

// Lazy load components
const ClientList = lazy(() => import('../../components/EmployeeModule/CustomersList'));
const CreateCustomer = lazy(() => import('../../components/EmployeeModule/CreateCustomer'));
const TrackLog = lazy(() => import('../../components/SettingsModule/Settings/TrackLog'));
const Settingscreen    =lazy (()=>import('../../components/SettingsModule/SettingsBase'))
import AuthenticationLog from '../../components/SettingsModule/Settings/AuthenticationLog';
import Loader from '../../genriccomponents/loaders/RedLoader';

// Fallback component for Suspense
const Loading = () => <div><Loader /></div>; // Assuming RedLoader is an existing loader component
const ProductedSettings = () => (
  <Suspense fallback={<Loading />}>
    <Settingscreen />
  </Suspense>
);

const ProductAuthenticationLog = () => (
  <Suspense fallback={<Loading />}>
    <AuthenticationLog />
  </Suspense>
);

const ProductedClientList = () => (
  <Suspense fallback={<Loading />}>
    <ClientList />
  </Suspense>
);

const ProductedCreateCustomer = () => (
  <Suspense fallback={<Loading />}>
    <CreateCustomer />
  </Suspense>
);

const ProductedLog = () => (
  <Suspense fallback={<Loading />}>
    <TrackLog />
  </Suspense>
);

export {
  ProductAuthenticationLog,
  ProductedSettings,
   ProductedClientList,
   ProductedCreateCustomer,
   ProductedLog
};