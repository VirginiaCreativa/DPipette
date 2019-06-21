import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './Setting.module.scss';

const SettingProfile = ({ firebase, firestore, profile, auth }) => {
  const [onEditableProfile, setOnEditableProfile] = useState(false);
  const [isConfirmChangeProfile, setConfirmChangeProfile] = useState(false);
  const [isNotConfirmChangeProfile, setNotConfirmChangeProfile] = useState(
    false
  );

  const handleOnEditableProfile = () => {
    setOnEditableProfile(!onEditableProfile);
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const { name, mobile, country, city } = ev.target.elements;
    console.log(name.value, mobile.value, country.value, city.value);

    firestore
      .update(`users/${auth.uid}`, {
        namefull: name.value,
        country: country.value || ' ',
        mobile: mobile.value || ' ',
        city: city.value || '',
      })
      .then(() => {
        setConfirmChangeProfile(true);
        setTimeout(() => {
          setConfirmChangeProfile(false);
        }, 5000);
      })
      .catch(error => {
        setNotConfirmChangeProfile(true);
        setTimeout(() => {
          setNotConfirmChangeProfile(false);
        }, 3000);
        console.log(error.message);
      });
  };

  const activeStylEditable = onEditableProfile
    ? classes.activeStylEditable
    : null;

  return (
    <div className={classes.ProfileDetail}>
      <div className={classes.Heading}>
        <div className={classes.Title}>
          <i className="bx bx-align-left"></i>
          <h6>Perfíl</h6>
        </div>
        <button type="button" onClick={handleOnEditableProfile}>
          <i className={[activeStylEditable, 'bx bx-pencil'].join(' ')}></i>
        </button>
      </div>

      <div className={classes.DetailUser}>
        <form onSubmit={handleSubmit}>
          {/* NOMBRE COMPLETO */}
          <div className="form-group">
            <label className="col-sm-5 col-form-label col-form-label-sm d-flex align-items-center">
              Nombre Completo
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input
                  type="text"
                  name="name"
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
            <label className="col-sm-5 col-form-label col-form-label-sm d-flex align-items-center">
              Celular
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input
                  type="text"
                  name="mobile"
                  className="form-control "
                  defaultValue={profile.mobile}
                />
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
            <label className="col-sm-5 col-form-label col-form-label-sm d-flex align-items-center">
              País
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  defaultValue={profile.country}
                />
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
            <label className="col-sm-5 col-form-label col-form-label-sm d-flex align-items-center">
              Ciudad
            </label>
            <div className="col-sm-7 d-flex justify-content-end align-items-center">
              {onEditableProfile ? (
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  defaultValue={profile.city}
                />
              ) : (
                <p>
                  {profile.city === null ? <span>vació</span> : profile.city}
                </p>
              )}
            </div>
          </div>
          {isConfirmChangeProfile && (
            <span className={classes.alertConfirman}>
              <i
                className="bx bxs-check-circle"
                style={{ color: '#49cba4' }}></i>
              Confirmación para guardar tu perfíl
            </span>
          )}
          {isNotConfirmChangeProfile && (
            <span className={classes.alertNotConfirman}>
              <i className="bx bxs-x-circle" style={{ color: '#f33d48' }}></i>
              Error
            </span>
          )}
          {onEditableProfile ? (
            <button type="submit" className="btn btn-primary btn-block">
              Guardar
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect(),
  connect(state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  }))
)(SettingProfile);
