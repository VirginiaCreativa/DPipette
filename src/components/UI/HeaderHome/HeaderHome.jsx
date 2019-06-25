import React from 'react';
import classes from './HeaderHome.module.scss';

const HeaderHome = ({ iconName, title, colored, onClick }) => {
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
        <button type="button" onClick={onClick} className={classes.btnPlusNew}>
          <i className="bx bx-plus-circle"></i>
        </button>
      </div>
    </>
  );
};

export default HeaderHome;
