/* eslint-disable ulbi-tv-plugin/layer-imports */
import { Reducer } from '@reduxjs/toolkit';
import { FC, memo, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager } from '@/app/providers/StorProvider';
import { StateSchemaKey } from '@/app/providers/StorProvider/config/StateSchema';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

export interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoaderUI: FC<DynamicModuleLoaderProps> = props => {
  const { children, reducers, removeAfterUnmount = true } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DISTROY ${name} reducer` });
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const DynamicModuleLoader = memo(DynamicModuleLoaderUI);
