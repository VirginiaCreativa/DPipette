import React from 'react';
import classes from './CoverClient.module.scss';

const CoverClient = ({ src, tema }) => (
  <div className={classes.CoverClient}>
    <div className={classes.BoxCover}>
      <div className={classes.BgOverly} />
      <img src={src} alt={tema} className="img-fluid" />
    </div>
  </div>
);

export default CoverClient;
