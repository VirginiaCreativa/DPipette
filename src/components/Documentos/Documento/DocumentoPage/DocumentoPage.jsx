import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../../../config/FirebaseConfig';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import classes from './DocumentoPage.module.scss';
import Spinner from '../UI/Spinner/Spinner';

import {
  showEditableDoc,
  hasPageDoc,
} from '../../../../redux/actions/DocumentosAction';

const PagesImages = React.lazy(() => import('./DocumentoImages'));

class DocumentoPage extends Component {
  state = {
    isProgressUpload: 0,
    hasImages: 0,
    hasPagesImages: [],
    hasFilesImages: [],
    isShowPage: false,
    isShowGetting: false,
    canGetEditableFile: true,
  };

  componentDidMount() {
    const { imgsPages, showEditable, hasPageDoc } = this.props;
    const { isShowPage, isShowGetting, canGetEditableFile } = this.state;

    if (imgsPages.length === 0) {
      this.setState({
        isShowPage: false,
        isShowGetting: true,
        canGetEditableFile: false,
      });
      hasPageDoc(false);
    } else {
      this.setState({
        isShowPage: true,
        isShowGetting: false,
        canGetEditableFile: false,
      });
      hasPageDoc(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isShowPage, isShowGetting, isProgressUpload } = this.state;
    const { imgsPages, showEditable, hasPageDoc } = this.props;

    if (imgsPages !== prevProps.imgsPages) {
      if (imgsPages.length === 0) {
        this.setState({
          isShowPage: false,
          isShowGetting: true,
          canGetEditableFile: true,
        });
        hasPageDoc(false);
      } else {
        this.setState({
          isShowPage: true,
          isShowGetting: false,
          canGetEditableFile: false,
        });
        hasPageDoc(true);
      }
    }

    if (showEditable !== prevProps.showEditable) {
      this.setState({
        isShowGetting: showEditable,
        canGetEditableFile: showEditable,
      });
    }

    setTimeout(() => {
      if (isProgressUpload !== prevState.isProgressUpload) {
        this.setState({
          isProgressUpload: 0,
        });
      }
    }, 4000);
  }

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

  handleAprobandoGetFile = () => {
    this.props.showEditableDoc(false);
  };

  handleRemovesImagesComplete = () => {
    const {
      documentos,
      ID,
      firestore,
      firebase: { storage },
    } = this.props;

    const filenamePageDoc = documentos[ID].filenamePageDoc;
    const materiaFB = documentos[ID].materia.toLowerCase();
    const temaFB = documentos[ID].tema.toLowerCase();
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');

    filenamePageDoc.forEach(element => {
      const storageRefImagePage = storage().ref(
        `documentos/${materiaFB}/${temaNotSpace}/pages/${element}`
      );
      storageRefImagePage
        .delete()
        .then(() => {
          console.log('SI DELETE IMAGENES PAGES');
        })
        .catch(error => {
          console.error('Error removing document: ', error);
        });
    });

    firestore.update(`documentos/${ID}`, {
      imgsPages: [],
      filenamePageDoc: [],
    });
  };

  render() {
    const {
      onRef,
      imgsPages,
      tema,
      showEditable,
      firebase: { storage },
      materia,
    } = this.props;
    const {
      isProgressUpload,
      isShowPage,
      isShowGetting,
      canGetEditableFile,
    } = this.state;

    const set = new Set(imgsPages);
    const imgsPagesOrder = [...new Set(set)].sort();

    const classProgressUpload = {
      width: `${isProgressUpload}%`,
    };

    return (
      <div className={classes.DocumentoPage} ref={onRef}>
        {isShowGetting && (
          <div className={classes.BoxFile}>
            <h6>Subir unos imagenes del documento</h6>
            <input
              type="file"
              name="uploadPDF"
              onChange={this.changeFiles}
              className={classes.InputFile}
              accept="image/jpeg"
              multiple
            />
            <button type="button" className="btn btn-primary btn-block">
              Añadir unos imagenes
            </button>
            <p>Obligación un archivo de imagen => jpg</p>
            <div className={classes.showUpload} style={classProgressUpload} />
          </div>
        )}
        {canGetEditableFile && (
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: '20px' }}>
            <button
              type="button"
              className="btn mr-1 btn-success"
              onClick={this.handleAprobandoGetFile}>
              <i className="bx bx-like" />
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={this.handleRemovesImagesComplete}>
              <i className="bx bx-trash-alt" />
            </button>
          </div>
        )}
        {isShowPage && (
          <div className={classes.BoxPage}>
            {imgsPagesOrder.map((item, index) => (
              <React.Suspense key={index} fallback={<Spinner />}>
                <PagesImages src={item} alt={`${tema}_${index}`} />
              </React.Suspense>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showEditableDoc, hasPageDoc }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
      PagesImgs: state.Documentos.PagesImgs,
      showEditable: state.Documentos.Editable,
    }),
    mapDispatchToProps
  )
)(DocumentoPage);
