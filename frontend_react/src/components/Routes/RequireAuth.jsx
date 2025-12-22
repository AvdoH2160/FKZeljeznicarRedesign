import React, { Children } from 'react'
import {Navigate} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext.jsx'

const RequireAuth = ({children, role}) => {
  const {user, loading} = useContext(AuthContext);

  if(loading) {
    return null;
  }

  if(!user) {
    return <Navigate to="/login" />;
  }

  if(role && !user.roles?.includes(role)) {
    return <Navigate to="/" />;
  }

  return children
}

export default RequireAuth