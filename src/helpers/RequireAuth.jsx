import { isLoggedIn } from '../api/database';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo }) => {
  return isLoggedIn() ? children : <Navigate replace to={redirectTo} />;
};

export default RequireAuth;
