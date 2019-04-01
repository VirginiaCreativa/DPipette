import React from 'react';
import classes from './DescriptionDetail.module.scss';

const DescriptionsList = ({ descriptions }) => (
  <div className={classes.DescriptionsList}>
    <ul>
      {descriptions &&
        descriptions.map((item, index) => (
          <li key={index}>
            <p className={classes.Primary}>
              <strong>{item.definicion}</strong>
            </p>
            <p className={classes.Secun}>{item.ejemplo}</p>
          </li>
        ))}
    </ul>
  </div>
);
export default DescriptionsList;
