import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from '../../UI/Moment/Moment';
import CapitalizeFirstLetter from '../../../scripts/CapitalizeFirstLetter';
import classes from './DocumentosHome.module.scss';

import CoverClient from '../../UI/CoverClient/CoverClient';

const DocumentosItem = ({
  linked,
  tema,
  materia,
  date,
  cover,
  portada,
  favorito,
}) => {
  const [isCover, setCover] = useState(cover);

  return (
    <Link to={linked}>
      <div className={classes.DocumentosItem}>
        <div className={classes.BookMark}>
          {favorito ? <i className="bx bxs-bookmark" /> : null}
        </div>
        <span className={classes.TagMateria}>
          {CapitalizeFirstLetter(materia)}
        </span>
        {isCover === 'option2' || portada === '' ? (
          <span className={classes.CoverEmpty} />
        ) : (
          <CoverClient src={portada} top="-25" />
        )}
        <div className={classes.BoxContent}>
          <div className={classes.DateItem}>
            <i className="bx bx-time" />
            <Moment
              onColor="#9ca7b4"
              onFontsize="0.775rem"
              date={date}
              onType="LL"
            />
          </div>
          <h3>{tema}</h3>
        </div>
      </div>
    </Link>
  );
};

export default DocumentosItem;
