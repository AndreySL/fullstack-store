import React from 'react';
import {CreateBrand, CreateDevice, CreateType} from '../components/index';

const Admin = () => {
  return (
    <div>
      <CreateType />
      <CreateBrand />
      <CreateDevice />
    </div>
  );
};

export default Admin;
