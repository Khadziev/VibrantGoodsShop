import { RouteProps } from "react-router-dom"
import RegistrationForm from "../Authorization/RegistrationForm"
import LoginForm from "../Authorization/LoginForm"
import MainPage from "../MainPage"
import Admin from "../Admin"
import User from "../User"

export enum AppRoutes {
  //NOT_FOUND = "not_found",
  SIGNUP = "registration",
  SIGNIN = "login",
  HOME="/",
  ADMIN="/admin",
  USER="/user",

}

export const RoutePatch: Record<AppRoutes, string> = {
    [AppRoutes.SIGNUP]: "/registration",
    [AppRoutes.SIGNIN]: "/login",
    [AppRoutes.HOME]:"/",
    [AppRoutes.ADMIN]:"/admin",
    [AppRoutes.USER]:"/user",
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
        element: <Admin/>
    },
    [AppRoutes.USER]: {
        path: RoutePatch[AppRoutes.USER],
        element: <User/>
    }
}

