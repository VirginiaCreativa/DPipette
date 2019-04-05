import React from 'react';
import classes from './Imagen.module.scss';

const Imagen = ({ src, onDelete, alt, ref }) => (
  <div className={classes.Imagen}>
    <button onClick={onDelete} type="button">
      <i className="bx bx-x" />
    </button>
    <img src={src} alt={alt} className="rounded-0" ref={ref} />
  </div>
);

export default Imagen;
