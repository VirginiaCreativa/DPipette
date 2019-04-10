import React from 'react';
import classes from './SignificadosMain.module.scss';
import Moment from '../../UI/Moment/Moment';

const SignificadosHeader = ({ date, word }) => (
  <div className={classes.GroupHeading}>
    <div className="row">
      <div className="col-6">
        <h4>{word}</h4>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-end">
        <div className={classes.GridDate}>
          <i className="bx bx-time" />
          <Moment
            onColor="#9ca7b4"
            onFontsize="0.775rem"
            date={date}
            onType="LL"
          />
        </div>
      </div>
    </div>
  </div>
);

export default SignificadosHeader;
