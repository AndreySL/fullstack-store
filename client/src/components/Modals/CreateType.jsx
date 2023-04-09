import React from 'react';
import {useState} from 'react';
import {createType} from '../../http/deviceAPI';

import styles from './Modals.module.scss';

// {children, visible, setVisible}

const CreateType = () => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const rootClasses = [styles.myModal];

  if (visible) {
    rootClasses.push(styles.active);
  }

  const addType = () => {
    createType({name: value}).then((data) => {
      setValue('');
      setVisible(false);
    });
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>create Type</button>
      {visible && (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
          <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
            <h1>Создать тип</h1>
            <input
              type="text"
              placeholder="Введите название типа"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div>
              <button onClick={addType}>Добавить</button>
              <button onClick={() => setVisible(false)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateType;
