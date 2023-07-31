import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from '../../apiServices/auth/authSlice';
import { userApi } from '../../apiServices/api/userApi';
import apiCart from '../../apiServices/api/apiCart';
import { reviewApi } from '../../apiServices/api/reviewApi';
import { AdminApi } from '../../apiServices/api/adminApi';


// Определение типов
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хуки
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [apiCart.reducerPath]: apiCart.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [AdminApi.reducerPath]: AdminApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, apiCart.middleware, reviewApi.middleware, AdminApi.middleware),
});

export default store;
