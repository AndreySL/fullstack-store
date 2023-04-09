import React, {useContext} from 'react';
import DeviceItem from '../DeviceItem/DeviceItem';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';

import styles from './DeviceList.module.scss';


const DeviceList = observer(() => {
  const {device} = useContext(Context);

  return (
    <div className={styles.List}>
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </div>
  );
});

export default DeviceList;
