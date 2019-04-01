/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MomentTo from '../../UI/MomentTo/MomentTo';
import classes from './NotesCornellMain.module.scss';

import CoverClient from '../UI/CoverClient';

const Item = ({ linked, tema, materia, date, cover }) => {
  const [isCover, setCover] = useState(cover);

  return (
    <Link to={linked}>
      <div className={classes.NotesCornellItem}>
        <span className={classes.TagMateria}>{materia}</span>
        {isCover === 'option1' ? (
          <CoverClient src="https://image.shutterstock.com/z/stock-photo-smiling-teen-girl-in-a-checkered-shirt-is-sitting-with-a-pencil-near-her-forehead-and-thinking-she-1022860681.jpg" />
        ) : (
          <span className={classes.CoverEmpty} />
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

export default Item;
