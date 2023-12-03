import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/providers/store";
import { login } from "@/apiServices/auth/authActions";
import { setToken } from "@/apiServices/auth/authSlice";

import styles from "./styles.module.css";
import { UserRole } from "@/components/Auth/model/model";

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  //const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginValue.length < 1 || loginValue.trim() !== loginValue) {
      setError("Неверный логин или пароль");
      return;
    }

    try {
      const response = await dispatch(
        login({
          login: loginValue,
          password,
          role: UserRole.USER,
          userId: "",
        })
      );

      const token = response.payload.token;

      dispatch(setToken(token));

      localStorage.setItem("userRole", UserRole.USER);
      localStorage.setItem("userName", response.payload.name);
      localStorage.setItem("userId", response.payload.userId);

      setError(null);

      navigate("/");
    } catch (error) {
      setError(`Неверный логин или пароль`);
    }
  };

  const handleRegisterClick = () => {
    navigate("/registration");
  };
  const spans = Array.from({ length: 300 }, (_, index) => <span key={index} className={styles.square}></span>);

  return (
    <section className={styles.section}>
      {spans}
      <div className={styles.signin}>
        <div className={styles.content}>
          <h2>ВОЙТИ</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="логин"
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
              />
              <i>ваш логин</i>
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>ваш пароль</i>
            </div>
            <div className={styles.links}>
              <button type="submit" className={styles.loginButton}>
                Войти
              </button>
              <p onClick={handleRegisterClick} className={styles.loginButton}>
                Зарегистрироваться
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
