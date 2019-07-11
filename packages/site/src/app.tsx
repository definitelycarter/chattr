import React from 'react';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './app.module.scss';

export default function App() {
  return (
    <div className={[styles.app, styles.light].join(' ')}>
      <Router>{Routes}</Router>
    </div>
  );
}
