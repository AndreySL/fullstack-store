import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Context} from '../../index';

import styles from './Pagination.module.scss';

const Pagination = observer(() => {
  const {device} = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <div className={styles.Pagination}>
      {pages.map((page) => (
        <span 
        className={styles.PaginationItem}
            key={page} 
            onClick={() => device.setPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
});

export default Pagination;
