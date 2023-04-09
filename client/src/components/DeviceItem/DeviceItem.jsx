import React from 'react';
import styles from './DeviceItem.module.scss';
import {useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE} from '../../utils/consts';
import {RiShoppingCart2Line, RiStarFill} from 'react-icons/ri';
import cl from 'classnames';

const DeviceItem = ({device}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.Card}>
      <img
        onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
        src={'http://localhost:5000/' + device.img}
        alt="img"
        className={cl(styles.CardImage)}
      />
      <div onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
        <h1>
          {device.brandId}
          {device.name}
        </h1>
        <RiStarFill />
        {device.rating}
      </div>
      <div className={styles.Wrapper}>
        <h2>{device.price}</h2>
        <div className={styles.CardIconContainer}>
          <RiShoppingCart2Line />
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
