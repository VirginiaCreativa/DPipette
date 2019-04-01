/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import classes from './InputBtnUpdate.module.scss';

const InputBtnUpdate = ({
  ActiveBtn,
  label,
  onChange,
  onClick,
  onValue,
  onRef,
  onFocus,
  onName,
  styled,
}) => (
  <div className={classes.InputBtnUpdate}>
    <label htmlFor={label}>{label}</label>
    <div className={classes.GroupBox}>
      <input
        type="text"
        onChange={onChange}
        value={onValue}
        ref={onRef}
        onFocus={onFocus}
        style={styled}
        name={onName}
      />
      {ActiveBtn ? (
        <button type="button" className="btn btn-success" onClick={onClick}>
          <i className="bx bx-check" />
        </button>
      ) : (
        <button type="button" className="btn btn-primary" onClick={onClick}>
          <i className="bx bx-revision" />
        </button>
      )}
    </div>
  </div>
);

export default InputBtnUpdate;
