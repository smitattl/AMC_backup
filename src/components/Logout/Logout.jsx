import React from 'react';
import styles from './Logout.module.css';

function Logout() {
  return (
    <div className={styles.thankyoucontainer}>
      <h1>Thank You for Logging Out</h1>
      <p>You have been successfully logged out. Have a great day!</p>
    </div>
  );
}

export default Logout;
