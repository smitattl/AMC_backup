import React from 'react';
import styles from './Loading.module.css';
import loadingGif from '../../images/Loading-truck.gif';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingOverlay}></div>
      <img src={loadingGif} alt="Loading..." className={styles.loadingGif} style={{height:160, width:160}} />
    </div>
  );
};

export default Loading;
