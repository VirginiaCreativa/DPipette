import React from 'react';
import classes from './CoverClient.module.scss';

const CoverClient = ({ src, tema, top }) => {
  const position = {
    top: `${top}%`,
  };
  return (
    <div className={classes.CoverClient}>
      <div className={classes.BoxCover}>
        <div className={classes.BgOverly} />
        <img src={src} alt={tema} className="img-fluid" style={position} />
      </div>
    </div>
  );
};

export default CoverClient;
