import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from '@/apiServices/auth/authSlice';
import { userApi } from '@/apiServices/api/userApi';
import apiCart from '@/apiServices/api/apiCart';
import { reviewApi } from '@/apiServices/api/reviewApi';
import { AdminApi } from '@/apiServices/api/adminApi';
import { paymentsApi } from '@/apiServices/api/paymentsApi';
import { apiMessage } from '@/apiServices/api/apiMessage';
import { apiCategory } from '@/apiServices/api/apiCategory';
import { apiSidebar } from '@/apiServices/api/apiSlider';
import { apiBrand } from '@/apiServices/api/apiBrand';



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [apiCart.reducerPath]: apiCart.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [AdminApi.reducerPath]: AdminApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [apiMessage.reducerPath]: apiMessage.reducer,
    [apiCategory.reducerPath]: apiCategory.reducer,
    [apiSidebar.reducerPath]: apiSidebar.reducer,
    [apiBrand.reducerPath]: apiBrand.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false
    }).concat(
      userApi.middleware,
      apiCart.middleware,
      reviewApi.middleware,
      AdminApi.middleware,
      paymentsApi.middleware,
      apiMessage.middleware,
      apiCategory.middleware,
      apiSidebar.middleware,
      apiBrand.middleware
    ),
});

export default store;
