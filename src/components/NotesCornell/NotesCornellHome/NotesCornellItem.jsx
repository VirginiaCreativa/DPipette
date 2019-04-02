/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MomentTo from '../../UI/MomentTo/MomentTo';
import CapitalizeFirstLetter from '../../../scripts/CapitalizeFirstLetter';
import classes from './NotesCornellHome.module.scss';

import CoverClient from '../UI/CoverClient';

const NotesCornellItem = ({ linked, tema, materia, date, cover, portada }) => {
  const [isCover, setCover] = useState(cover);

  return (
    <Link to={linked}>
      <div className={classes.NotesCornellItem}>
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
            <MomentTo
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

export default NotesCornellItem;
