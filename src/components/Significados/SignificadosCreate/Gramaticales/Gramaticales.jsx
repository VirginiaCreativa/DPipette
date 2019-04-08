/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import classes from './Gramaticales.module.scss';

const Gramaticales = ({ onSelects, ref }) => (
  <div className={classes.Gramaticales}>
    <div className="form-group">
      <label>Gramaticales</label>
      <i className="bx bx-chevron-down" />
      <select className="form-control select" onChange={onSelects} ref={ref}>
        <option value="....">Por favor, elija una opción</option>
        <option value="Adjetivo">Adjetivo (adj.)</option>
        <option value="Adverbio">Adverbio (adv.)</option>
        <option value="Preposición">Preposición (prep.)</option>
        <option value="Verbo Intransitivo">Verbo Intransitivo (intr.)</option>
        <option value="Verbo Transitivo">Verbo Transitivo (tr.)</option>
      </select>
    </div>
  </div>
);

export default Gramaticales;
