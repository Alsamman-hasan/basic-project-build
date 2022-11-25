import { memo, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import AppRouter from './providers/router/ui/AppRouter.tsx';

export const App = memo(() => {
  return (
    <div className={classNames('app', {}, ['app_light_theme'])}>
      <Suspense fallback="">
        <AppRouter />
      </Suspense>
    </div>
  );
});
