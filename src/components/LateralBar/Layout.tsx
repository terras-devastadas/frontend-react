import React from 'react';
import { Outlet } from 'react-router-dom';
import LateralBar from '../../pages/LateralBar/LateralBar';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <LateralBar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;