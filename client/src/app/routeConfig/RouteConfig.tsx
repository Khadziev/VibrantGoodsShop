import { RouteProps } from 'react-router-dom';
import RegistrationForm from '@/features/auth/register/RegistrationForm';
import LoginForm from '@/features/auth/login/LoginForm';
import HomePage from '@/pages/home/HomePage';
import { ProductDetailsPageAsync } from '@/pages/product-details/ProductDetailsPage.async';
import { AdminPageAsync } from '@/pages/admin/AdminPage.async';
import { UserPageAsync } from '@/pages/user/UserPage.async';
import { CartPageAsync } from '@/pages/cart/CartPage.async';
import DiscountedProducts from '@/pages/discount/Discounted/DiscountedProducts';
import { ProductsPageAsync } from '@/pages/products/ProductsPage.async';
import { UserProfilePageAsync } from '@/pages/user/UserProfilePage.async';
import { MessagePageAsync } from '@/pages/message/MessagePage.async';
import CheckoutPage from '@/pages/checkout/CheckoutPage';

export enum AppRoutes {
  SIGNUP = 'registration',
  SIGNIN = 'login',
  HOME = '/',
  ADMIN = '/admin',
  USER = '/user',
  USERID = '/data/:id',
  CART = '/cart',
  DISCOUNT = '/discount',
  DATAALL = '/data/all',
  PROFILE = '/data/all/users/:id',
  MESSAGE = '/message',
  CHEKOUNT = '/checkout',
}

export const RoutePatch: Record<AppRoutes, string> = {
  [AppRoutes.SIGNUP]: '/registration',
  [AppRoutes.SIGNIN]: '/login',
  [AppRoutes.HOME]: '/',
  [AppRoutes.ADMIN]: '/admin',
  [AppRoutes.USER]: '/user',
  [AppRoutes.USERID]: '/data/:id',
  [AppRoutes.CART]: '/cart',
  [AppRoutes.DISCOUNT]: '/discount',
  [AppRoutes.DATAALL]: '/data/all',
  [AppRoutes.PROFILE]: '/users/:id',
  [AppRoutes.MESSAGE]: '/message',
  [AppRoutes.CHEKOUNT]: '/checkout',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.SIGNUP]: {
    path: RoutePatch[AppRoutes.SIGNUP],
    element: <RegistrationForm />,
  },
  [AppRoutes.SIGNIN]: {
    path: RoutePatch[AppRoutes.SIGNIN],
    element: <LoginForm />,
  },
  [AppRoutes.HOME]: {
    path: RoutePatch[AppRoutes.HOME],
    element: <HomePage />,
  },
  [AppRoutes.ADMIN]: {
    path: RoutePatch[AppRoutes.ADMIN],
    element: <AdminPageAsync />,
  },
  [AppRoutes.USER]: {
    path: RoutePatch[AppRoutes.USER],
    element: <UserPageAsync />,
  },
  [AppRoutes.USERID]: {
    path: RoutePatch[AppRoutes.USERID],
    element: <ProductDetailsPageAsync />,
  },
  [AppRoutes.CART]: {
    path: RoutePatch[AppRoutes.CART],
    element: <CartPageAsync />,
  },
  [AppRoutes.DISCOUNT]: {
    path: RoutePatch[AppRoutes.DISCOUNT],
    element: <DiscountedProducts />,
  },
  [AppRoutes.DATAALL]: {
    path: RoutePatch[AppRoutes.DATAALL],
    element: <ProductsPageAsync />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePatch[AppRoutes.PROFILE],
    element: <UserProfilePageAsync />,
  },
  [AppRoutes.MESSAGE]: {
    path: RoutePatch[AppRoutes.MESSAGE],
    element: <MessagePageAsync />,
  },
  [AppRoutes.CHEKOUNT]: {
    path: RoutePatch[AppRoutes.CHEKOUNT],
    element: <CheckoutPage />,
  },
};
