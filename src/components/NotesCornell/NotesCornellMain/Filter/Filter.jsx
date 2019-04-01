import React from 'react';
import classes from './Filter.module.scss';

const Filter = () => {
  const handleFilteAdd = () => {
    console.log('Funciona');
  };
  const handleFiltePresent = () => {
    console.log('Funciona');
  };
  const handleFilteStar = () => {
    console.log('Funciona');
  };
  const handleFilteRecient = () => {
    console.log('Funciona');
  };
  return (
    <div className={classes.Filter}>
      <div className={classes.Menu}>
        <button
          type="button"
          onClick={handleFilteAdd}
          className={classes.Active}>
          <i className="bx bx-grid-alt" />
          Todas
        </button>
        <button type="button" onClick={handleFiltePresent}>
          <i className="bx bx-calendar-event" />
          Presentación
        </button>
        <button type="button" onClick={handleFilteStar}>
          <i className="bx bx-star" />
          Favoritos
        </button>
        <button type="button" onClick={handleFilteRecient}>
          <i className="bx bx-time" />
          Recientes
        </button>
      </div>
      <div className={classes.Materias}>
        <h6>Etiquetas</h6>
        <ul>
          <li>
            <button type="button">Materia 2</button>
          </li>
          <li>
            <button type="button">Materia 3</button>
          </li>
          <li>
            <button type="button">Materia 1</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
