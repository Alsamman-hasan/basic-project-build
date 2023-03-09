import {
  AnyAction,
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { $api } from "@/shared/api/api";

import { createReducerManager } from "./reduserManager";
import { StateSchema, ThunkExtraArg, TStore } from "./StateSchema";
import { rtkApi } from "@/shared/api/rtkApi";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
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
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
        serializableCheck: false,
      }).concat(rtkApi.middleware),
  }) as TStore;

  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, AnyAction>;
