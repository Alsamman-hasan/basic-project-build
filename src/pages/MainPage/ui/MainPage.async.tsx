/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazyRetry } from "@/shared/lib/lazyRetry/lazyWithRetry";

export const MainPageAsync = lazyRetry(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./MainPage")), 1500);
    })
);
