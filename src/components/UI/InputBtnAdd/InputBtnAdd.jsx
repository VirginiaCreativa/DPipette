/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import classes from './InputBtnAdd.module.scss';

const InputBtnAdd = ({
  label,
  onChange,
  onClick,
  onValue,
  onRefInput,
  onDisabled,
  onFocus,
}) => (
  <div className={classes.InputBtnAdd}>
    <label htmlFor={label}>{label}</label>
    <div className={classes.GroupBox}>
      <input
        type="text"
        onChange={onChange}
        value={onValue}
        ref={onRefInput}
        onFocus={onFocus}
      />
      <button
        type="button"
        disabled={onDisabled}
        className="btn btn-primary"
        onClick={onClick}>
        <i className="bx bx-edit" />
      </button>
    </div>
  </div>
);

export default InputBtnAdd;
