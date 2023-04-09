import {observer} from 'mobx-react-lite';
import React from 'react';
import {useContext} from 'react';
import {useState, useEffect} from 'react';
import {Context} from '../../index';
import {createDevice, fetchBrands, fetchTypes} from '../../http/deviceAPI';

import styles from './Modals.module.scss';

const CreateDevice = observer(() => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [visible, setVisible] = useState(false);

  const {device} = useContext(Context);

  const rootClasses = [styles.myModal];

  if (visible) {
    rootClasses.push(styles.active);
  }

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addInfo = () => {
    console.log(1);
    setInfo([...info, {title: '', description: '', number: Date.now()}]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? {...i, [key]: value} : i)));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then((data) => setVisible(false));
  };

  console.log(device.selectedBrand);
  console.log(device.selectedType);

  return (
    <>
      <button onClick={() => setVisible(true)}>create device</button>
      {visible && (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
          <div
            style={{display: 'flex', flexDirection: 'column', gap: 10}}
            className={styles.myModalContent}
            onClick={(e) => e.stopPropagation()}>
            <h1>Создать девайс</h1>

            <div>
              <h6>{device.selectedBrand.name || 'Выберите брэнд'}</h6>

              {device.brands.map((brand) => (
                <button onClick={() => device.setSelectedBrand(brand)} key={brand.id}>
                  {brand.name}
                </button>
              ))}
            </div>
            <div>
              <h6>{device.selectedType.name || 'Выберите тип'}</h6>

              {device.types.map((type) => (
                <button onClick={() => device.setSelectedType(type)} key={type.id}>
                  {type.name}
                </button>
              ))}
            </div>

            {/* {/* <select 
            value={device.electedTypes}
            onChange={() => device.setSelectedTypes()}
            defaultValue={'default'}>
              <option value="default" disabled>
                Выберите тип
              </option>
              {device.types.map((type) => (
                <option value={type.name}  key={type.id}>
                  {type.name}
                </option>
              ))}
            </select> */}
            {/* <select onChange={device._selectedBrand}>
              {device.brands.map((brand) => (
                <option
                  value={brand.selectedBrand}
                  onClick={() => device.setSelectedBrands()}
                  key={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select> */}

            <input
              type="text"
              placeholder="Введите название устройства"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Введите название устройства"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <input type="file" onChange={selectFile} accept="image/png, image/jpeg" />

            <hr />

            <button onClick={addInfo}>Добавить новое свойство</button>
            {info.map((i) => (
              <div key={i.number}>
                <input
                  type="text"
                  placeholder="Введите название свойства"
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                />
                <input
                  type="text"
                  placeholder="Введите описание свойства"
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                />
                <button onClick={() => removeInfo(i.number)} style={{border: '1px solid red'}}>
                  Удалить
                </button>
              </div>
            ))}
            <div>
              <button onClick={addDevice}>Добавить</button>
              <button onClick={() => setVisible(false)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default CreateDevice;
