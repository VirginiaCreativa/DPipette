import React from 'react';
import classes from './DescriptionList.module.scss';

const DescriptionList = ({ description, onDelete }) => (
  <>
    <li className={classes.DescriptionList} onClick={onDelete} role="button">
      <h6>{description.definicion}</h6>
      <p>{description.ejemplo}</p>
    </li>
  </>
);

export default DescriptionList;
