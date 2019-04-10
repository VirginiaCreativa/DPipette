import React from 'react';
import { Link } from 'react-router-dom';
import Moment from '../../UI/Moment/Moment';
import VideoPlayer from '../../UI/VideoPlayerHome/VideoPlayerHome';
import classes from './SiginificadosItem.module.scss';

const SignificadoItem = ({
  linked,
  word,
  videoDescripcion,
  descriptions,
  date,
}) => (
  <>
    <div className={classes.SiginificadosItem}>
      <Link to={linked} className={classes.LinkGrid}>
        <div className={classes.GroupParagh}>
          <div className="row">
            <div className="col-6">
              <h1>{word}</h1>
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
        <div className={classes.BoxVideo}>
          <VideoPlayer srcVideo={videoDescripcion} />
        </div>
        <div className={classes.GroupParaghSecun}>
          <p className={classes.Definicion}>{descriptions[0].definicion}</p>
          <p className={classes.Definicion}>{descriptions[1].definicion}</p>
        </div>
      </Link>
    </div>
  </>
);

export default SignificadoItem;
