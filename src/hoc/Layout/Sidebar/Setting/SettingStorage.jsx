import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Setting.module.scss';

const Storage = ({ porcentStorage }) => (
  <div className={classes.infoStorage}>
    <p>4,2 GB de 15 GB usado</p>
    <div className={classes.linePorce}>
      <div
        className={classes.cantPorce}
        style={{ width: `${porcentStorage}%` }}
      />
      <div className={classes.bgPorce} />
    </div>
    <Link to="/almacenamiento" tabIndex="0">
      <i className="bx bx-cloud" />
      Adquirir más almacenamiento
    </Link>
  </div>
);

export default Storage;
