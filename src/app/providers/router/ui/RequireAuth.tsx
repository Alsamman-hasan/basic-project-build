import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutesPaths } from '@/shared/config/routeConfig/routeConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
  // const auth = useSelector(getUserAuthData);
  const auth = true;
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutesPaths.main} state={{ from: location }} replace />;
  }

  return children;
}
