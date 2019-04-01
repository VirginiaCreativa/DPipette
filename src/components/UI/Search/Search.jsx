import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Search.module.scss';

import { searchSignificados } from '../../../redux/actions/Action';

const Search = props => {
  const handleSearch = ev => {
    props.searchSignificados(ev.target.value);
  };
  return (
    <div className={classes.Search}>
      <i className="bx bx-search" title="El icono de Buscador" />
      <input
        type="text"
        placeholder="Buscador"
        title="Search"
        onChange={handleSearch}
      />
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
