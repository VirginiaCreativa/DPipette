import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Setting.module.scss';

const SettingProfile = ({ profile, onClick }) => {
  const [onEditableProfile, setOnEditableProfile] = useState(true);

  const handleOnEditableProfile = () => {
    setOnEditableProfile(!onEditableProfile);
  };
  return (
    <div className={classes.ProfileDetail}>
      <div className={classes.Heading}>
        <div className={classes.Title}>
          <i className="bx bx-align-left"></i>
          <h6>Perfíl</h6>
        </div>
        <button type="button" onClick={handleOnEditableProfile}>
          <i className="bx bx-pencil"></i>
        </button>
      </div>

      <div className={classes.DetailUser}>
        <form action="">
          {/* NOMBRE COMPLETO */}
          <div className="form-group">
            <label className="col-sm-5 col-form-label col-form-label-sm">
              Nombre Completo
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  defaultValue={profile.namefull}
                />
              ) : (
                <p>{profile.namefull}</p>
              )}
            </div>
          </div>
          {/* CELULAR */}
          <div className="form-group">
            <label className="col-sm-5 col-form-label col-form-label-sm">
              Celular
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input type="text" className="form-control form-control-sm " />
              ) : (
                <p>
                  {profile.mobile === null ? (
                    <span>vació</span>
                  ) : (
                    profile.mobile
                  )}
                </p>
              )}
            </div>
          </div>
          {/* PAÍS */}
          <div className="form-group">
            <label className="col-sm-5 col-form-label col-form-label-sm">
              País
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input type="text" className="form-control form-control-sm" />
              ) : (
                <p>
                  {profile.country === null ? (
                    <span>vació</span>
                  ) : (
                    profile.country
                  )}
                </p>
              )}
            </div>
          </div>
          {/* CIUDAD */}
          <div className="form-group">
            <label className="col-sm-5 col-form-label col-form-label-sm">
              Ciudad
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input type="text" className="form-control form-control-sm " />
              ) : (
                <p>
                  {profile.city === null ? <span>vació</span> : profile.city}
                </p>
              )}
            </div>
          </div>
          {/* PHOTO */}
          <div className="form-group">
            <label className="col-sm-5  col-form-label col-form-label-sm">
              Foto del perfíl
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input type="text" className="form-control form-control-sm " />
              ) : (
                <div className={classes.ProfileImg}>
                  <img src={profile.photo} alt="El imagen de perfil" />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile,
  }))
)(SettingProfile);
