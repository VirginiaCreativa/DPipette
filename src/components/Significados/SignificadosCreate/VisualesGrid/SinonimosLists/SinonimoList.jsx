import React from 'react';
import classes from './SinonimoList.module.scss';

const SinonimoList = ({ sinonimo, onDelete }) => (
  <>
    <li className={classes.SinonimoList} onClick={onDelete} role="button">
      {sinonimo}
    </li>
  </>
);

export default SinonimoList;
