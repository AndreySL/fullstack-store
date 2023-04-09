import {observer} from 'mobx-react-lite';
import React from 'react';
import {useContext} from 'react';
import {Context} from '../../index';

import styles from './TypeBar.module.scss';

const TypeBar = observer(() => {
  const {device} = useContext(Context);

  return (
    <ul className={styles.TypeBar}>
      <span>Каталог</span>
      {device.types.map((type) => (
        <li key={type.id} className={styles.TypeBarItem}>
          {type.name}
        </li>
      ))}
    </ul>
  );
});

export default TypeBar;
