import { memo, Suspense } from 'react';
import AppRouter from './providers/router/ui/AppRouter.tsx';
import { classNames } from '@/shared/lib/classNames/classNames';

export const App = memo(() => (
  <div className={classNames('app', {}, ['app_light_theme'])}>
    <Suspense fallback=''>
      <AppRouter />
    </Suspense>
  </div>
));
