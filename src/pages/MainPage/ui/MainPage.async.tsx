/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazy } from 'react';

export const MainPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import('./MainPage')), 1500);
    })
);
