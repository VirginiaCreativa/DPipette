/* eslint-disable prefer-const */
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { withHandlers } from 'recompose';
import firebase from '../../../../config/FirebaseConfig';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import classes from './DocumentoPage.module.scss';
import Spinner from '../UI/Spinner/Spinner';

import { addPagesImgsDoc } from '../../../../redux/actions/DocumentosAction';

class DocumentoPage extends Component {
  state = {
    isProgressUpload: 0,
    hasImages: 0,
    hasPagesImages: [],
  };

  uploadFiles = files => {
    const {
      documentos,
      ID,
      firestore,
      firebase: { storage },
    } = this.props;
    const materiaFB = documentos[ID].materia.toLowerCase();
    const temaFB = documentos[ID].tema.toLowerCase();
    const materia = CleanUpSpecialChars(materiaFB);
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');

    const metadata = {
      contentType: 'image/jpg',
    };
    const storageRef = storage().ref(
      `documentos/${materia}/${temaNotSpace}/pages/${files.name}`
    );

    const uploadTask = storageRef.put(files, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const isDuration = parseFloat(progress).toFixed(0);
        console.log(`Upload is ${isDuration}% done ${files.name}`);
        this.setState({ isProgressUpload: isDuration });
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
          const { hasPagesImages } = this.state;
          this.setState({ hasPagesImages: hasPagesImages.concat(downloadURL) });
          firestore.update(`documentos/${ID}`, {
            imgsPages: hasPagesImages,
          });
        });
      }
    );
  };

  changeFiles = ev => {
    const { documentos, ID } = this.props;

    const temaFB = documentos[ID].tema.toLowerCase();
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');

    const files = ev.target.files;

    this.setState({ hasImages: files.length });
    const fileList = [];

    for (let i = 0; i < files.length; i += 1) {
      const imgfiles = ev.target.files[i];

      const changeNameFile = imgfiles.slice(0, imgfiles.size, 'image/jpg');
      const imgFilesName = new File([changeNameFile], `${temaNotSpace}_${i}`, {
        type: 'image/jpg',
      });
      const reader = new FileReader();
      reader.onload = ev => {
        fileList.push(ev.target.result);
      };
      reader.readAsDataURL(imgFilesName);
      this.uploadFiles(imgFilesName);
    }
  };

  render() {
    const { onRef, imgsPages, tema } = this.props;
    const { isProgressUpload } = this.state;

    return (
      <div className={classes.DocumentoPage} ref={onRef}>
        <input
          type="file"
          name="uploadPDF"
          onChange={this.changeFiles}
          accept="image/*"
          multiple
        />
        <h5>{isProgressUpload}%</h5>
        {imgsPages &&
          imgsPages.map((item, index) => (
            <img
              key={index}
              src={item}
              alt={`${tema}_${index}`}
              className="img-fluid"
            />
          ))}
      </div>
    );
  }
}

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
      PagesImgs: state.Documentos.PagesImgs,
    }),
    null
  )
)(DocumentoPage);
