import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "@/app/providers/store";
import LoginForm from "../Auth/LoginForm";
import { logout } from "@/apiServices/auth/authActions";
import { setToken } from "@/apiServices/auth/authSlice";
import Button from "@/UI/Button/Button";
import Text from "@/UI/Text/Text";
import CenteredMenu from "@/widgets/sidebar/centeredmenu/CenteredMenu";

const Header: React.FC = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginForm] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Ошибка при разлогинивании:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken && location.pathname !== "/registration") {
      navigate("/login", { replace: true });
    } else {
      dispatch(setToken(storedToken));
    }
  }, [dispatch, location.pathname, navigate]);

  return (
    <div className="fixed top-3 w-full bg-transparent z-10">
      <nav className="flex items-center justify-between flex-wrap bg-transparent mx-10">
        <div className="flex items-center flex-shrink-0 text-white h-full">
          <Link to="/" className="font-semibold text-xl tracking-tight">
            <Text text="VibrantGoods" color="white" />
          </Link>
        </div>
        <div className="flex items-center h-full mt-6">
          {user && <CenteredMenu />}
        </div>
        {user && (
          <div className="flex items-center h-full">
            <Button text="Выйти" color="white" onClick={handleLogout} />
          </div>
        )}
      </nav>
      {showLoginForm && <LoginForm />}
    </div>
  );
});

export default Header;
