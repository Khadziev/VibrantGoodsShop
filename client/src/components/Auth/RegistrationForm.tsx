import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/providers/store";
import { register } from "../../apiServices/auth/authActions";
import { UserRole } from "../../apiServices/model/types";
import styles from "./styles.module.css";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, ] = useState(UserRole.USER);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register({ name, login, password, role: role }));
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Ошибка при регистрации:", error);
    }
  };
  const spans = Array.from({ length: 300 }, (_, index) => <span key={index} className={styles.square}></span>);

  return (
    <section className={styles.section}>
      {spans}
      <div className={styles.signin}>
        <div className={styles.content}>
          <h2>РЕГИСТРАЦИЯ</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
              <i>ваше имя</i>
              <input
                type="text"
                placeholder="логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
              <i>ваш логин</i>
              <input
                type="password"
                placeholder="пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
              <i>ваш пароль</i>
            </div>
            <button type="submit" disabled={loading} className={styles.loginButton}>
              Регистрация
            </button>
            <button className={styles.loginButton}>Уже есть аккаунт? Войти</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
