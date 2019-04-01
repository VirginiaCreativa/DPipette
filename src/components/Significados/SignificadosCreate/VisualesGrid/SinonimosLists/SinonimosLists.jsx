import React from 'react';
import SinonimoList from './SinonimoList';
import classes from './SinonimoList.module.scss';

const SinonimosLists = ({ sinonimos, onDelete }) => (
  <>
    <ul className={classes.SinonimosLists}>
      {sinonimos &&
        sinonimos.map((item, index) => (
          <SinonimoList
            key={item}
            {...item}
            sinonimo={item}
            onDelete={() => onDelete(index)}
          />
        ))}
    </ul>
  </>
);

export default SinonimosLists;
