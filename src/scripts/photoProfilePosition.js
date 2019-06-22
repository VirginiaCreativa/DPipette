const imgUser = require('../assets/icons/user_unknown.svg');

const photoProfilePosition = (firebase, profile) => {
  const currentUser = firebase.auth().currentUser;
  let photoProfile;
  if (currentUser) {
    if (currentUser.providerData[0].providerId === 'google.com') {
      photoProfile = currentUser.photoURL;
    } else if (
      currentUser.providerData[0].providerId === 'password' &&
      profile.photo === ''
    ) {
      photoProfile = imgUser;
    } else {
      photoProfile = profile.photo;
    }
  } else {
    console.log('ERROR');
  }
  return photoProfile;
};

export default photoProfilePosition;
