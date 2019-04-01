import React from 'react';
import classes from './MasEjemplosDetail.module.scss';

const MasEjemplosDetail = ({ ejemplos }) => (
  <div className={classes.MasEjemplosDetail}>
    <h5>Más ejemplos</h5>
    <ul>
      {ejemplos &&
        ejemplos.map(item => (
          <li key={item}>
            <p>{item}</p>
          </li>
        ))}
    </ul>
  </div>
);

export default MasEjemplosDetail;
