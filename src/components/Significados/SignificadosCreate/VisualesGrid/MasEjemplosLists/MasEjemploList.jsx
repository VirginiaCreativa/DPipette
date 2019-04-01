import React from 'react';
import classes from './MasEjemplosLists.module.scss';

const MasEjemploList = ({ ejemplo, onDelete }) => (
  <>
    <li className={classes.MasEjemploList} onClick={onDelete} role="button">
      <p>{ejemplo}</p>
    </li>
  </>
);

export default MasEjemploList;
