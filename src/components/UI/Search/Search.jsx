import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Search.module.scss';

import { searchSignificados } from '../../../redux/actions/SignificadosAction';

const Search = props => {
  const handleSearch = ev => {
    props.searchSignificados(ev.target.value);
  };
  return (
    <div className={classes.Search}>
      <input
        type="text"
        placeholder="Buscador significado"
        title="Search"
        onChange={handleSearch}
      />
      <i className="bx bx-search" title="El icono de Buscador" />
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchSignificados }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    null,
    mapDispatchToProps
  )
)(Search);
