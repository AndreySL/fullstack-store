import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { Context } from '../index';
import {authRoutes, publicRoutes} from '../routes';
import {SHOP_ROUTE} from '../utils/consts';

const AppRouter = observer(() => {
  const {user} = useContext(Context)
  const auth = true
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({path, Component}) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;