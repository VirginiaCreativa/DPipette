import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from '../../../../UI/Moment/Moment';
import classes from './RecientItemSignificado.module.scss';

const RecientItemSignificado = ({
  linked,
  word,
  imagenes,
  descriptions,
  date,
}) => (
  <>
    <div className={classes.RecientItemSignificado}>
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
            <Moment
              onColor="#9ca7b4"
              onFontsize="0.775rem"
              date={date}
              onType="ll"
            />
          </div>
        </div>
      </Link>
    </div>
  </>
);

export default RecientItemSignificado;
