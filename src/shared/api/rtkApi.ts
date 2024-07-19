/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { StateSchema } from '@/app/providers/StorProvider';
// import { authDataActions } from '@/entities/authData';

const baseUrl = __IS_DEV__ ? process.env.API_URL_VEV : process.env.API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // const {
    //   authData: { authData },
    // } = getState() as StateSchema;
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  const { dispatch } = api;
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      'users/auth/refresh',
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // dispatch(authDataActions.setAccessToken(refreshResult.data as string));
      result = await baseQuery(args, api, extraOptions);
    }
  }
  if (result.error) {
    enqueueSnackbar('Что-то пошло не так', {
      variant: 'error',
    });
    localStorage.clear();
  }

  return result;
};

export const rtkApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  reducerPath: 'rtkApi',
});
