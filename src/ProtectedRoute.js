import React from 'react'
import { useSelector } from 'react-redux';
import Error404 from './Error404';

const ProtectedRoute = ({children}) => {
  const { token } = useSelector((state) => state.user);

  return (
    <>
    {token ? {children}:<Error404/>}
    </>
  )
}

export default ProtectedRoute
