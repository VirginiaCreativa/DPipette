import React from 'react';
import { Link } from 'react-router-dom';
import MomentTo from '../../UI/MomentTo/MomentTo';
import classes from './ItemSignificado.module.scss';

const ItemSignificado = ({ linked, word, imagenes, descriptions, date }) => (
  <>
    <div className={classes.ItemSignificado}>
      <Link to={`/significado/${linked}`}>
        <div className={classes.boxGrid}>
          <div className={classes.imgOverflow}>
            <img src={imagenes[1]} alt={word} />
          </div>
          <div className={classes.GroupParag}>
            <h6>{word}</h6>
            <p>{descriptions[0].definicion}</p>
          </div>
          <div className={classes.RecientDate}>
            <MomentTo
              onColor="#9ca7b4"
              onFontsize="0.7rem"
              date={date}
              onType="L"
            />
          </div>
        </div>
      </Link>
    </div>
  </>
);

export default ItemSignificado;
