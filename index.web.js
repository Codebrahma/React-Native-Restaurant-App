import React from 'react';
import ReactDOM from 'react-dom';
import styles from './web/index.scss';

const Index = () => (
  <div className={styles.cb}>
    Hello React!
  </div>
);

ReactDOM.render(<Index />, document.getElementById('index'));
