import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {observer} from 'mobx-react-lite';
import {useContext} from 'react';
import {Context} from '../index';
import {login, registration} from '../http/userAPI';

import styles from '../styles/pages.module.scss';
import cl from 'classnames';

const Auth = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useContext(Context);
  let location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className={cl(styles.Page, styles.PageAuth)}>
      <div className={styles.PageAuthContainer}>
        <h1 className={styles.PageAuthContainerCaption}>
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h1>
        <input
          className={styles.PageAuthContainerInput}
          type="email"
          placeholder="Почта"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.PageAuthContainerInput}
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.PageAuthContainerButton} onClick={click}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
        {isLogin ? (
          <div className={styles.PageAuthContainerSub}>
            <span>Нет аккаунта?</span>
            <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
          </div>
        ) : (
          <div className={styles.PageAuthContainerSub}>
            <span>Есть аккаунт?</span>
            <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
          </div>
        )}
      </div>
    </div>
  );
});

export default Auth;
