import React from 'react';
import classes from './ButtonIcon.module.scss';

const ButtonIcon = ({ onClick, typeIcon, btnColor }) => (
  <div className={classes.ButtonIcon}>
    <button
      type="button"
      onClick={onClick}
      className={['btn', btnColor].join(' ')}
    >
      <i className={['bx', typeIcon].join(' ')} />
    </button>
  </div>
);

export default ButtonIcon;
