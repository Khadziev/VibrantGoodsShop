import { RouteProps } from "react-router-dom"
import RegistrationForm from "../Auth/RegistrationForm"
import LoginForm from "../Auth/LoginForm"
import MainPage from "../MainPage"

import UserProductDetails from "../User/UserProductDetails"
import { AdminPageAsync } from "../Pages/adminPage/Admin.async"
import { UserPageAsync } from "../Pages/userPage/User.async"

export enum AppRoutes {
  //NOT_FOUND = "not_found",
  SIGNUP = "registration",
  SIGNIN = "login",
  HOME = "/",
  ADMIN = "/admin",
  USER = "/user",
  USERID = "/data/:id",
}

export const RoutePatch: Record<AppRoutes, string> = {
  [AppRoutes.SIGNUP]: "/registration",
  [AppRoutes.SIGNIN]: "/login",
  [AppRoutes.HOME]: "/",
  [AppRoutes.ADMIN]: "/admin",
  [AppRoutes.USER]: "/user",
  [AppRoutes.USERID]: "/data/:id",
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
  }
}
