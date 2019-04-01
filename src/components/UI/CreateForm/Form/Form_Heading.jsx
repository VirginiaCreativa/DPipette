import React from 'react';
import classes from './Form_Heading.module.scss';

const FormHeading = ({ title, number }) => (
  <div className={classes.FormHeading}>
    <span>{number}</span>
    <h1>{title}</h1>
  </div>
);

export default FormHeading;
