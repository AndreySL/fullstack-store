import React from 'react';
import {useState} from 'react';
import {createBrand} from '../../http/deviceAPI';

import styles from './Modals.module.scss';

const CreateBrand = () => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const rootClasses = [styles.myModal];

  if (visible) {
    rootClasses.push(styles.active);
  }

  const addBrand = () => {
    createBrand({name: value}).then((data) => {
      setValue('');
      setVisible(false);
    });
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>create Brand</button>
      {visible && (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
          <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
            <h1>Создать брэнд</h1>
            <input
              type="text"
              placeholder="Введите название брэнда"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div>
              <button onClick={addBrand}>Добавить</button>
              <button onClick={() => setVisible(false)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBrand;
