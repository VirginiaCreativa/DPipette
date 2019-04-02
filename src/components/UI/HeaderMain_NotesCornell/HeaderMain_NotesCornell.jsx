/* eslint-disable no-shadow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './HeaderMain_NotesCornell.module.scss';

import { SearchNotesCornell } from '../../../redux/actions/NotesCornellAction';

const HeaderMainNotesCornell = ({
  iconName,
  linked,
  title,
  colored,
  SearchNotesCornell,
  clicked,
}) => {
  const handleSearch = ev => {
    SearchNotesCornell(ev.target.value);
  };
  const colorSelect = {
    backgroundColor: colored,
  };
  return (
    <div className={classes.HeaderMainNotesCornell}>
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
  bindActionCreators({ SearchNotesCornell }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    null,
    mapDispatchToProps
  )
)(HeaderMainNotesCornell);
