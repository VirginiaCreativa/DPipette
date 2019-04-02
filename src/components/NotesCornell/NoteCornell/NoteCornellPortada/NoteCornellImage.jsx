import React from 'react';
import classes from './NoteCornellPortada.module.scss';

const NoteCornellImage = ({ src, alt, onClick }) => (
  <>
    <img src={src} alt={alt} className="img-fluid" />
    <button type="button" className={classes.BtnRemove} onClick={onClick}>
      <i className="bx bxs-x-circle" />
    </button>
  </>
);

export default NoteCornellImage;
