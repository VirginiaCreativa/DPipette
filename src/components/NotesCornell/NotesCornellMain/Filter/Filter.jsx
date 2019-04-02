import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './Filter.module.scss';

import { FilterMateriaNC } from '../../../../redux/actions/NotesCornellAction';

const Filter = ({ notescornell, FilterMateriaNC }) => {
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
  const handleTagFilter = item => {
    console.log(item);
    FilterMateriaNC(item);
  };
  const materia = notescornell && notescornell.map(item => item.materia);
  const tags = [...new Set(materia)].sort();

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
          {tags.map(item => (
            <li key={item}>
              <button type="button" onClick={() => handleTagFilter(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ FilterMateriaNC }, dispatch);

export default compose(
  firestoreConnect(['notescornell']),
  connect(
    state => ({
      notescornell: state.firestore.ordered.notescornell,
    }),
    mapDispatchToProps
  )
)(Filter);
