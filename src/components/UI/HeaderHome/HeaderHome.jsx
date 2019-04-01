import React from 'react';
import classes from './HeaderHome.module.scss';

const HeaderHome = ({ iconName, title, colored }) => {
  const colorSelect = {
    backgroundColor: colored,
  };

  return (
    <>
      <div className={classes.HeaderHome}>
        <h5>
          <i
            className={[classes.iconCircle, iconName].join(' ')}
            style={colorSelect}
          />
          {title}
        </h5>
      </div>
    </>
  );
};

export default HeaderHome;
