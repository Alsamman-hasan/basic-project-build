import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';
import { AppRoutesProps } from '@/shared/types/router';
import { routesConfig } from '../config/routeConfig';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );
    return (
      <Route
        key={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
        path={route.path}
      />
    );
  }, []);

  return <Routes>{Object.values(routesConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
