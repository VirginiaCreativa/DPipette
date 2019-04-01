import React from 'react';
import classes from './InputRadioIcon.module.scss';

const InputRadioIcon = ({ label, onValue, onRef, onChange }) => (
  <div className={classes.InputRadioIcon}>
    <label htmlFor={onValue}>
      <span className={classes.Circle} />
      <input
        type="radio"
        name="tags"
        id="cbox1"
        value={onValue}
        ref={onRef}
        onChange={onChange}
      />
      {label}
    </label>
  </div>
);
export default InputRadioIcon;
