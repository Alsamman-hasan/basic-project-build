import { MainPage } from '@/pages/MainPage';
import { NotfoundPage } from '@/pages/NotFoundPage';
import { AppRoutes, getRouteMain } from '@/shared/consts/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routesConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    authOnly: true,
    element: <MainPage />,
    path: getRouteMain(),
  },

  // last
  [AppRoutes.NOTFOUND]: {
    element: <NotfoundPage />,
    path: '*',
  },
};
