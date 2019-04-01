import React from 'react';
import classes from './Search.module.scss';

const Search = ({ onChange }) => (
  <div className={classes.Search}>
    <i className="bx bx-search" title="El icono de Buscador" />
    <input
      type="text"
      placeholder="Search"
      title="Search"
      onChange={onChange}
    />
  </div>
);

export default Search;
