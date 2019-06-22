import React, { useState, useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { history } from '../../../../redux/store/Store';
import photoProfile from '../../../../scripts/photoProfilePosition';
import classes from './Setting.module.scss';

import SettingSub from './SettingSub';
import SettingStorage from './SettingStorage';
import SettingProfile from './SettingProfile';

import { getOnSetting } from '../../../../redux/actions/LayoutAction';

const Setting = ({
  firebase,
  firestore,
  firebase: { storage },
  profile,
  auth,
  getOnSetting,
}) => {
  const [isPhotoProfile, setPhotoProfile] = useState('');
  const [canBtnEditPhoto, setCanBtnEditPhoto] = useState(false);

  console.log(auth);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (user.providerData[0].providerId === 'google.com') {
        setCanBtnEditPhoto(false);
      } else {
        setCanBtnEditPhoto(true);
      }
    }
  });

  const handleLogOut = () => {
    firebase.logout();
  };
  const handleConfiguration = () => {
    history.push('/configuration');
    getOnSetting(false);
  };
  const handleContact = () => {
    history.push('/contact');
    getOnSetting(false);
  };
  const handleOnFileImageProfile = ev => {
    const imgFile = ev.target.files[0];
    console.log(imgFile);
    const metadata = {
      contentType: 'image/jpg',
    };
    const storageRef = storage().ref(
      `users/${auth.uid}/profile/photo/${imgFile.name}`
    );
    const uploadTask = storageRef.put(imgFile, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const isDuration = parseFloat(progress).toFixed(0);
        console.log(`Upload is ${isDuration}% done`);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
          default:
            console.log('Upload Not');
        }
      },
      error => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            console.log(error);
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('imageFile available at', downloadURL);
          setPhotoProfile(downloadURL);
        });
      }
    );
  };

  useEffect(() => () => {
    const userCurrent = firebase.auth().currentUser;
    if (userCurrent) {
      if (
        userCurrent.providerData[0].providerId === 'password' &&
        profile.photo === ''
      ) {
        firestore.update(`users/${auth.uid}`, {
          photo: isPhotoProfile,
        });
      }
    }
  });

  return (
    <div className={classes.Setting}>
      <h6 className={classes.titleSetting}>Ajuste</h6>
      <header>
        {canBtnEditPhoto && (
          <div className={classes.boxEditPhoto}>
            <button type="button">
              <i className="bx bx-pencil" style={{ color: '#49cba4' }}></i>
            </button>
            <input
              type="file"
              className={classes.InputFile}
              onChange={handleOnFileImageProfile}
            />
          </div>
        )}
        <div className={classes.ProfileImg}>
          <img
            src={photoProfile(firebase, profile)}
            alt="El imagen de perfil"
          />
        </div>
        <div className={classes.ProfileData}>
          <h1>{profile.namefull}</h1>
          <p>{profile.email}</p>
        </div>
      </header>
      <div className={classes.boxSubSetting}>
        <SettingSub
          onLogOut={handleLogOut}
          onConfig={handleConfiguration}
          onContact={handleContact}
        />
      </div>
      <div className={classes.boxStorage}>
        <SettingStorage porcentStorage="43" />
      </div>
      <div className={classes.boxProfile}>
        <SettingProfile />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOnSetting }, dispatch);

export default compose(
  firestoreConnect(),
  connect(
    ({ firebase: { auth, profile } }) => ({
      auth,
      profile,
    }),
    mapDispatchToProps
  )
)(Setting);
