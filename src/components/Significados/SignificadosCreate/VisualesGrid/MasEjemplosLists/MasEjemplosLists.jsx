import React from 'react';
import MasEjemploList from './MasEjemploList';
import classes from './MasEjemplosLists.module.scss';

const MasEjemplosLists = ({ masejemplos, onDelete }) => (
  <>
    <ul className={classes.MasEjemplosLists}>
      {masejemplos &&
        masejemplos.map((item, index) => (
          <MasEjemploList
            key={index}
            {...item}
            ejemplo={item}
            onDelete={() => onDelete(index)}
          />
        ))}
    </ul>
  </>
);

export default MasEjemplosLists;
