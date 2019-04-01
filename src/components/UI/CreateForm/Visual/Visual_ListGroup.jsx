import React from 'react';
import classes from './Visual_ListGroup.module.scss';

const VisualListGroup = ({ title, number, isVisible, children }) => (
  <div className={classes.VisualListGroup}>
    <div
      className={
        isVisible ? classes.GroupHeading_Show : classes.GroupHeading_Hide
      }>
      <span>{number}</span>
      <h1>{title}</h1>
    </div>
    <div>{children}</div>
  </div>
);

export default VisualListGroup;
