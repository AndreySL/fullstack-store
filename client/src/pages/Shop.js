import React, {useEffect} from 'react';
import {useContext} from 'react';
import {Context} from '../index';
import {BrandBar, DeviceList, TypeBar, Pagination} from '../components';
import {fetchDevices, fetchBrands, fetchTypes} from '../http/deviceAPI';
import {observer} from 'mobx-react-lite';
import styles from '../styles/pages.module.scss';
import cl from 'classnames';

const Shop = observer(() => {
  const {device, user} = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 12).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 12).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <div className={styles.Page}>
      <div className={cl(styles.Page, styles.PageShop)}>
        <TypeBar />
        <div className={styles.PageShopWrapper}>
          <BrandBar />
          <DeviceList />
          <Pagination />
        </div>
      </div>
    </div>
  );
});

export default Shop;
