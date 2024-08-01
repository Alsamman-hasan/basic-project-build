import {
  AnyAction,
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg, TStore } from './StateSchema';
import { createReducerManager } from './reduserManager';
import { $api } from '@/shared/api/api';

import { rtkApi } from '@/shared/api/rtkApi';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    // last
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducer);
  const extraArg: ThunkExtraArg = {
    api: $api,
  };
  const store = configureStore({
    devTools: __IS_DEV__,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
    preloadedState: initialState,
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
  }) as TStore;

  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, AnyAction>;
