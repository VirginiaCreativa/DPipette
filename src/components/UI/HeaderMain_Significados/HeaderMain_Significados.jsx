/* eslint-disable no-shadow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './HeaderMain_Significados.module.scss';

import { searchSignificados } from '../../../redux/actions/Action';

const HeaderMainSignificados = ({
  iconName,
  linked,
  title,
  colored,
  searchSignificados,
  clicked,
}) => {
  const handleSearch = ev => {
    searchSignificados(ev.target.value);
  };
  const colorSelect = {
    backgroundColor: colored,
  };
  return (
    <div className={classes.HeaderMain_Significados}>
      <div className="row">
        <div className="col-10">
          <div className={classes.BoxTitleSearch}>
            <div className={classes.Title}>
              <h2>
                <i
                  className={[classes.iconCircle, iconName].join(' ')}
                  style={colorSelect}
                />
                {title}
              </h2>
            </div>
            <div className={classes.SearchBox}>
              <div className={classes.Search}>
                <input type="text" onChange={handleSearch} />
                <span />
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 d-flex align-items-start justify-content-end">
          <div className={classes.BtnAdd}>
            <Link to={linked} onClick={clicked}>
              Añadir nuevo
              <i className="bx bx-plus" />
            </Link>
          </div>
        </div>
      </div>
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
)(HeaderMainSignificados);
