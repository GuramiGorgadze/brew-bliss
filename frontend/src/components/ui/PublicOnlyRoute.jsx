import { Navigate } from 'react-router-dom';
import { useUserData } from '../../context/UserContext';

function PublicOnlyRoute({ children, redirectTo = '/' }) {
  const { loggedIn, isAuthLoading } = useUserData();

  if (isAuthLoading) return null;

  return loggedIn ? (
    <Navigate
      to={redirectTo}
      replace
    />
  ) : (
    children
  );
}

export default PublicOnlyRoute;
