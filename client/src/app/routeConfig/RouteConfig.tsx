import { RouteProps } from "react-router-dom"
import RegistrationForm from "../../components/Auth/RegistrationForm"
import LoginForm from "../../components/Auth/LoginForm"
import MainPage from "../../pages/mainPage/MainPage"
import UserProductDetails from "../../components/Data/ProductDetailsId"
import { AdminPageAsync } from "../../pages/adminPage/Admin.async"
import { UserPageAsync } from "../../pages/userPage/User.async"
import CartComponent from "../../components/Basket/CartComponent"
import DiscountedProducts from "../../components/Discounted/DiscountedProducts"
import GetAllProducts from "../../components/Data/GetAllProducts"


export enum AppRoutes {
  //NOT_FOUND = "not_found",
  SIGNUP = "registration",
  SIGNIN = "login",
  HOME = "/",
  ADMIN = "/admin",
  USER = "/user",
  USERID = "/data/:id",
  CART = "/cart",
  DISCOUNT="/discount",
  DATAALL="/data/all"
}

export const RoutePatch: Record<AppRoutes, string> = {
  [AppRoutes.SIGNUP]: "/registration",
  [AppRoutes.SIGNIN]: "/login",
  [AppRoutes.HOME]: "/",
  [AppRoutes.ADMIN]: "/admin",
  [AppRoutes.USER]: "/user",
  [AppRoutes.USERID]: "/data/:id",
  [AppRoutes.CART]: "/cart",
  [AppRoutes.DISCOUNT]: "/discount",
  [AppRoutes.DATAALL]: "/data/all"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.SIGNUP]: {
    path: RoutePatch[AppRoutes.SIGNUP],
    element: <RegistrationForm/>
  },
  [AppRoutes.SIGNIN]: {
    path: RoutePatch[AppRoutes.SIGNIN],
    element: <LoginForm/>
  },
  [AppRoutes.HOME]: {
    path: RoutePatch[AppRoutes.HOME],
    element: <MainPage/>
  },
  [AppRoutes.ADMIN]: {
    path: RoutePatch[AppRoutes.ADMIN],
    element: <AdminPageAsync/>
  },
  [AppRoutes.USER]: {
    path: RoutePatch[AppRoutes.USER],
    element: <UserPageAsync/>
  },
  [AppRoutes.USERID]: {
    path: RoutePatch[AppRoutes.USERID],
    element: <UserProductDetails/>
  },
  [AppRoutes.CART]: {
    path: RoutePatch[AppRoutes.CART],
    element: <CartComponent/>
  },
  [AppRoutes.DISCOUNT]: {
    path: RoutePatch[AppRoutes.DISCOUNT],
    element: <DiscountedProducts/>
  },
  [AppRoutes.DATAALL]: {
    path: RoutePatch[AppRoutes.DATAALL],
    element: <GetAllProducts/>
  }
}
