import React from 'react';
import classes from './Gramaticales.module.scss';

const Gramaticales = ({ onSelects, ref }) => (
  <div className={classes.Gramaticales}>
    <h5>Gramáticales</h5>
    <label>
      <input
        type="radio"
        name="gramaticales"
        value="Adjetivo"
        onChange={onSelects}
      />
      <div className={classes.Box}>
        <div className={classes.IconBox}>
          <div className={classes.Adjetivo} />
        </div>
        <span>Adjetivo</span>
      </div>
    </label>
    <label>
      <input
        type="radio"
        name="gramaticales"
        value="Adverbio"
        onChange={onSelects}
      />
      <div className={classes.Box}>
        <div className={classes.IconBox}>
          <div className={classes.Adverbio} />
        </div>
        <span>Adverbio</span>
      </div>
    </label>
    <label>
      <input
        type="radio"
        name="gramaticales"
        value="Verbos"
        onChange={onSelects}
      />
      <div className={classes.Box}>
        <div className={classes.IconBox}>
          <div className={classes.Verbos} />
        </div>
        <span>Verbo</span>
      </div>
    </label>
  </div>
);

export default Gramaticales;
