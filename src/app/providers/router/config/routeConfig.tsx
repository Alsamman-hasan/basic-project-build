import { MainPage } from '@/pages/MainPage';
import { NotfoundPage } from '@/pages/NotFoundPage';
import { AppRoutes, getRouteMain } from '@/shared/consts/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routesConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true,
  },

  // last
  [AppRoutes.NOTFOUND]: {
    path: '*',
    element: <NotfoundPage />,
  },
};
