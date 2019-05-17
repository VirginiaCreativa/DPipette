import React from 'react';
import Moment from '../../../UI/Moment/Moment';
import classes from './DocumentoHeader.module.scss';

const Heading = ({ materia, tema, date }) => (
  <div className={classes.TitleHeading}>
    <Moment onColor="#747d8c" onFontsize="0.775rem" date={date} onType="LLLL" />
    <div className={classes.GroupTitle}>
      <h1 className={classes.Tema}>{tema}</h1>
      <span className={classes.Materia}>{materia}</span>
    </div>
  </div>
);

export default Heading;
