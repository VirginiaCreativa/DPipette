import React from 'react';
import classes from './ImagenesDetail.module.scss';

const ImagenesDetail = ({ imagenes, word }) => (
  <div className={classes.ImagenesDetail}>
    {imagenes.map(item => (
      <div className={classes.ImagenOverw} key={item}>
        <img src={item} alt={word} />
      </div>
    ))}
  </div>
);

export default ImagenesDetail;
