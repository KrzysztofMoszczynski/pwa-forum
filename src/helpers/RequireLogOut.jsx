import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';

const RequireLogOut = ({ children, redirectTo }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate replace to={redirectTo} /> : children;
};

export default RequireLogOut;
