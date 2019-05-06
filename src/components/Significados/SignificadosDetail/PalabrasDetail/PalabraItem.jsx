import React from 'react';
import classes from './PalabrasDetail.module.scss';

const PalabraItem = ({ palabras, title, classed }) => (
  <div className={classes.PalabraItem}>
    <h6>{title}</h6>
    <ul className="list-unstyled">
      {palabras &&
        palabras.map(pal => (
          <li className={classed} key={pal}>
            {pal}
          </li>
        ))}
    </ul>
  </div>
);

export default PalabraItem;
