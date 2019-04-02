import React from 'react';
import Moment from '../../../UI/Moment/Moment';
import CapitalizeFirstLetter from '../../../../scripts/CapitalizeFirstLetter';
import classes from './NoteCornellHeader.module.scss';

const Header = ({ materia, tema, date }) => (
  <div className={classes.TitleHeader}>
    <Moment onColor="#747d8c" onFontsize="0.775rem" date={date} onType="LLLL" />
    <div className={classes.GroupTitle}>
      <h1 className={classes.Tema}>{tema}</h1>
      <span className={classes.Materia}>{CapitalizeFirstLetter(materia)}</span>
    </div>
  </div>
);

export default Header;
