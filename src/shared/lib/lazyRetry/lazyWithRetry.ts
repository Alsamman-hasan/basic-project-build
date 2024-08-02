/* eslint-disable @typescript-eslint/ban-types */
import { lazy } from 'react';

export const lazyRetry = (componentImport: Function) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem('page-has-been-force-refreshed') || 'false',
    );

    try {
      const component = await componentImport();

      window.localStorage.setItem('page-has-been-force-refreshed', 'false');

      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.localStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }
      throw error;
    }
  });

// import { ComponentType, lazy } from "react";

// type ComponentPromise<T = any> = Promise<{ default: ComponentType<T> }>;

// export function lazyRetry(
//   component: () => ComponentPromise,
//   retries?: number,
//   interval?: number
// ): React.LazyExoticComponent<React.ComponentType<any>> {
//   return lazy(() => retry(component, retries, interval));
// }

// function retry(fn: () => ComponentPromise, retriesLeft = 5, interval = 1000): ComponentPromise {
//   return new Promise((resolve, reject) => {
//     fn()
//       .then(resolve)
//       .catch((error) => {
//         setTimeout(() => {
//           if (retriesLeft === 1) {
//             reject(error);
//             return;
//           }
//           retry(fn, retriesLeft - 1, interval).then(resolve, reject);
//         }, interval);
//       });
//   });
// }
