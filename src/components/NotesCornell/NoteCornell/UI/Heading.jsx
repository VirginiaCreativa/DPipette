import React from 'react';
import classes from './Heading.module.scss';

const Heading = ({ onClick, title, onActive }) => {
  const classActive = onActive ? classes.btnActive : classes.btnEditable;
  return (
    <div className={classes.Heading}>
      <h5>{title}</h5>
      <button type="button" onClick={onClick} className={classActive}>
        <i className="bx bx-pencil" />
      </button>
    </div>
  );
};

export default Heading;
