/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
  import { FC, SVGProps } from 'react';

  const SVG: FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

interface AutocompleteUiItem<T extends string> {
  title: T;
  id: string | number;
}
interface Autocomplete<T> {
  value: string;
  label: T;
}

interface SelectItems<T extends string> {
  name: T;
  id: string | number;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;

declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type ValueOf<T> = T[keyof T];
declare interface Iresponse<R, E> {
  result?: R;
  error?: E;
}
