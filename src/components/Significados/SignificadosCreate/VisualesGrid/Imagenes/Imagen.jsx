import React from 'react';
import classes from './Imagen.module.scss';

const Imagen = ({ Image, onDelete, alt }) => (
  <div className={classes.Imagen}>
    <button onClick={onDelete} type="button">
      <i className="bx bx-x" />
    </button>
    <img src={Image} alt={alt} className="rounded-0" />
  </div>
);

export default Imagen;
