import React from 'react';
import classes from './SignificadosMain.module.scss';

const ListsImagenes = ({ imagenes, word }) => (
  <div className={classes.GroupImgs}>
    {imagenes &&
      imagenes.map(itemImg => (
        <div key={itemImg} className={classes.imgOverflow}>
          <img src={itemImg} alt={word} className="img-fluid" />
        </div>
      ))}
  </div>
);

export default ListsImagenes;
