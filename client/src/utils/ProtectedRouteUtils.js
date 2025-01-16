import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const { user, token, status } = useSelector((state) => state.auth);
  
  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  if (!localStorage.getItem('user_access_token')) {
    return <Navigate to="/login" />;
  }
  // if ( localStorage.getItem('user_access_token')) {
  //   return <Navigate to="/login" />;
  // }

  // if (!roles.includes('user')) {
  //   return <Navigate to="/" />;
  // }

  return <>{children}</>;
};

export default PrivateRoute;
