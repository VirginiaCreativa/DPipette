import React from 'react';
import classes from './DescriptionDetail.module.scss';

const PalabrasLists = ({ palabras, title, classed }) => (
  <div className={classes.PalabrasLists}>
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

export default PalabrasLists;
