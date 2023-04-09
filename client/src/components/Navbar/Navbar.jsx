import React from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../../utils/consts';
import styles from './Navbar.module.scss';
import {RiShoppingCart2Line, RiUser2Line, RiSettings2Line} from 'react-icons/ri';
import {useContext} from 'react';
import {Context} from '../../index';

const Navbar = () => {
  const {user} = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const authPage = location == LOGIN_ROUTE || REGISTRATION_ROUTE;

  return (
    <div className={styles.Navbar}>
      <div className={styles.NavbarTitle} onClick={() => navigate(SHOP_ROUTE)}>
        QPICK
      </div>

      <div className={styles.NavbarLinks}>
        <div onClick={() => navigate(BASKET_ROUTE)} className={styles.NavbarElement}>
          <RiShoppingCart2Line size="1.5rem" />
          <span className={styles.NavbarElementDescription}>Корзина</span>
        </div>

        {user.isAuth ? (
          <div>
            <div onClick={() => navigate(ADMIN_ROUTE)} className={styles.NavbarElement}>
              <RiSettings2Line size="1.5rem" />
              <span className={styles.NavbarElementDescription}>Админка</span>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.NavbarElement}>
              <RiUser2Line onClick={() => navigate(LOGIN_ROUTE)} size="1.5rem" />
              <span className={styles.NavbarElementDescription}>Войти</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
