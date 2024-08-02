import {
  configureStore,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
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
  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage,
      whitelist: [],
    },
    reducerManager.reduce as Reducer<StateSchema>,
  ) as Reducer<StateSchema & PersistPartial, UnknownAction, StateSchema>;

  const store = configureStore({
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
    preloadedState: initialState,
    reducer: persistedReducer,
  }) as TStore;
  const persist = persistStore(store);
  store.reducerManager = reducerManager;
  return { persist, store };
}

export type AppDispatch = ThunkDispatch<
  StateSchema,
  ThunkExtraArg,
  UnknownAction
>;
