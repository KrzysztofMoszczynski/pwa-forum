import { isLoggedIn } from '../api/database';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';

const RequireAuth = ({ children, redirectTo }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate replace to={redirectTo} />;
};

export default RequireAuth;
