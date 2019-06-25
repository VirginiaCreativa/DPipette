import React from 'react';
import classes from './btnAdd.module.scss';

const btnAdd = ({ onClick }) => (
  <div className={classes.BtnAdd}>
    <button type="button" onClick={onClick}>
      Añadir nuevo
      <i className="bx bx-plus" />
    </button>
  </div>
);

export default btnAdd;
