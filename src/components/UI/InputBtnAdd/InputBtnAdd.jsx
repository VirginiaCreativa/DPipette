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
  onActiveBtn,
}) => {
  const activeBtn = onActiveBtn ? classes.cssBtnActive : null;
  console.log(onActiveBtn);
  return (
    <div className={classes.InputBtnAdd}>
      <label htmlFor={label}>{label}</label>
      <div className={classes.GroupBox}>
        <input
          type="text"
          onChange={onChange}
          value={onValue}
          ref={onRefInput}
          onFocus={onFocus}
          placeholder="Añadir palabra o frase corto"
        />
        <button type="button" disabled={onDisabled} onClick={onClick}>
          <i className={['bx bx-edit', activeBtn].join(' ')} />
        </button>
      </div>
    </div>
  );
};

export default InputBtnAdd;
