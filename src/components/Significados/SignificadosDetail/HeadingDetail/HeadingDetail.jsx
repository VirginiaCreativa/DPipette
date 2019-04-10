import React, { useState } from 'react';
import Moment from '../../../UI/Moment/Moment';
import classes from './HeadingDetail.module.scss';

const HeadingDetail = ({ word, date, abrev, abreviatura, onDeleted }) => {
  const [isAbrev, setIsAbrev] = useState(false);
  const handleShowTitleAbrev = () => {
    setIsAbrev(true);
  };
  const handleHideTitleAbrev = () => {
    setIsAbrev(false);
  };

  return (
    <div className={classes.HeaderDetail}>
      <div className="row">
        <div className="col-9">
          <div className={classes.HeadingDetail}>
            <Moment
              onColor="#747d8c"
              onFontsize="0.775rem"
              date={date}
              onType="LLLL"
              onDisplay="block"
            />
            <h1>
              {word}
              <span
                className={classes.Abreviatura}
                onMouseMove={handleShowTitleAbrev}
                onMouseOut={handleHideTitleAbrev}>
                {abrev}
              </span>
              {isAbrev ? (
                <span className={classes.AbrevTitle}>{abreviatura}</span>
              ) : null}
            </h1>
          </div>
        </div>
        <div className="col-3">
          <div className={classes.GroupBtns}>
            <button type="button" className={classes.btnEditable}>
              <i className="bx bxs-pencil" />
            </button>
            <button
              type="button"
              onClick={onDeleted}
              className={classes.btnDelete}>
              <i className="bx bx-trash-alt" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingDetail;
