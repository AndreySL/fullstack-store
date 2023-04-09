import {observer} from 'mobx-react-lite';
import React from 'react';
import {useContext} from 'react';
import {Context} from '../../index';
import cl from 'classnames'

import styles from './BrandBar.module.scss';

const BrandBar = observer(() => {
  const {device} = useContext(Context);

  return (
    <ul className={styles.BrandBar}>
      {device.brands.map((brand) => (
        <li
          onClick={() => device.setSelectedBrand(brand)}
          key={brand.id}
          className={styles.BrandBarItem}>
          {brand.name}
        </li>
      ))}
      <li className={styles.Last}>Показать все</li>
    </ul>
  );
});

export default BrandBar;
