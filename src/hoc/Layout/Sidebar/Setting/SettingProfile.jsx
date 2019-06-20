import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Setting.module.scss';

const SettingProfile = ({ canEditableProfile, profile, onClick }) => (
  <div className={classes.ProfileDetail}>
    <div className={classes.Heading}>
      <div className={classes.Title}>
        <i className="bx bx-align-left"></i>
        <h6>Perfíl</h6>
      </div>
      <button type="button" onClick={onClick}>
        <i className="bx bx-pencil"></i>
      </button>
    </div>

    <div className={classes.DetailUser}>
      <form action="">
        {/* NOMBRE COMPLETO */}
        <div className="form-group">
          <label className="col-sm-6 col-form-label col-form-label-sm">
            Nombre Completo
          </label>
          <div className="col-sm-6 d-flex justify-content-end align-items-center">
            {canEditableProfile ? (
              <input type="text" className="form-control form-control-sm " />
            ) : (
              <p>{profile.namefull}</p>
            )}
          </div>
        </div>
        {/* CELULAR */}
        <div className="form-group">
          <label className="col-sm-6 col-form-label col-form-label-sm">
            Celular
          </label>
          <div className="col-sm-6 d-flex justify-content-end align-items-center">
            {canEditableProfile ? (
              <input type="text" className="form-control form-control-sm " />
            ) : (
              <p>
                {profile.mobile === null ? <span>vació</span> : profile.mobile}
              </p>
            )}
          </div>
        </div>
        {/* PAÍS */}
        <div className="form-group">
          <label className="col-sm-6 col-form-label col-form-label-sm">
            País
          </label>
          <div className="col-sm-6 d-flex justify-content-end align-items-center">
            {canEditableProfile ? (
              <input type="text" className="form-control form-control-sm " />
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
          <label className="col-sm-6 col-form-label col-form-label-sm">
            Ciudad
          </label>
          <div className="col-sm-6 d-flex justify-content-end align-items-center">
            {canEditableProfile ? (
              <input type="text" className="form-control form-control-sm " />
            ) : (
              <p>{profile.city === null ? <span>vació</span> : profile.city}</p>
            )}
          </div>
        </div>
        {/* PHOTO */}
        <div className="form-group">
          <label className="col-sm-4  col-form-label col-form-label-sm">
            Foto del perfíl
          </label>
          <div className="col-sm-8 d-flex justify-content-end align-items-center">
            {canEditableProfile ? (
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

export default compose(
  firebaseConnect(),
  connect(state => ({
    canEditableProfile: state.Layout.canEditableProfile,
    profile: state.firebase.profile,
  }))
)(SettingProfile);
