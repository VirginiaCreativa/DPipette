import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../../../config/FirebaseConfig';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import classes from './DocumentoPage.module.scss';
import Spinner from '../UI/Spinner/Spinner';

class DocumentoPage extends Component {
  state = {
    isProgressUpload: 0,
    hasImages: 0,
    hasPagesImages: [],
    hasFilesImages: [],
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
          const { hasPagesImages, hasFilesImages } = this.state;
          this.setState(prevState => ({
            hasPagesImages: hasPagesImages.concat(downloadURL),
          }));
          firestore.update(`documentos/${ID}`, {
            imgsPages: hasPagesImages,
            filenamePageDoc: hasFilesImages,
          });
        });
      }
    );
  };

  changeFiles = ev => {
    const { documentos, ID, firestore } = this.props;

    const temaFB = documentos[ID].tema.toLowerCase();
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');

    const files = ev.target.files;

    for (let i = 0; i < files.length; i += 1) {
      const imgsFiles = ev.target.files[i];

      const { hasFilesImages } = this.state;
      this.setState(prevState => ({
        hasFilesImages: prevState.hasFilesImages.concat(imgsFiles.name),
      }));
      this.uploadFiles(imgsFiles);
    }
  };

  render() {
    const { onRef, imgsPages, tema } = this.props;
    const { isProgressUpload } = this.state;

    const set = new Set(imgsPages);
    const imgsPagesOrder = Array.from(set).sort();

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
        {imgsPagesOrder &&
          imgsPagesOrder.map((item, index) => (
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
  connect(state => ({
    documentos: state.firestore.data.documentos,
    PagesImgs: state.Documentos.PagesImgs,
  }))
)(DocumentoPage);
