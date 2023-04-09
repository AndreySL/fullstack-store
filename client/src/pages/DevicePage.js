import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchOneDevice} from '../http/deviceAPI';

const DevicePage = () => {
  const [device, setDevice] = useState({info: []});
  const {id} = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  console.log(device);

  return (
    <div>
      <img src={process.env.REACT_APP_API_URL + device.img} alt="img" />
    </div>
  );
};

export default DevicePage;
