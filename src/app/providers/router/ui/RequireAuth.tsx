import { Navigate, useLocation } from 'react-router-dom';
import { getRouteMain } from '@/shared/consts/router';

export function RequireAuth({ children }: { children: JSX.Element }) {
  // const auth = useSelector(getUserAuthData);
  const auth = true;
  const location = useLocation();

  if (!auth)
    return <Navigate replace to={getRouteMain()} state={{ from: location }} />;

  return children;
}
