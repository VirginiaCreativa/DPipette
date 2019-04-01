/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './ImagenesUploader.module.scss';
import Progress from '../../../UI/Progress/Progress';
import firebase from '../../../../config/FirebaseConfig';

import {
  getUploaderImg,
  addImagenesFiles,
} from '../../../../redux/actions/Action';

class ImagenesUploader extends Component {
  state = {
    uploadValue: 0,
    imagenes: [],
    loaded: false,
    loader: false,
  };

  componentDidUpdate(prevProps) {
    const { imgFiles } = this.props;
    if (prevProps.imgFiles !== imgFiles) {
      setTimeout(() => {
        this.setState({ loaded: false });
      }, 8000);
      if (imgFiles.length === 4) {
        this.setState({ loader: true });
      } else {
        this.setState({ loader: false });
      }
    }
    const { imagenes } = this.state;
    this.props.getUploaderImg(imagenes);
  }

  handleOnFileChange = e => {
    const files = e.target.files;
    const fileList = [];
    for (let i = 0; i < files.length; i += 1) {
      const imgfiles = e.target.files[i];
      const reader = new FileReader();
      reader.onload = ev => {
        fileList.push(ev.target.result);
      };
      reader.readAsDataURL(imgfiles);
      const imgURL = window.URL.createObjectURL(imgfiles);
      this.props.addImagenesFiles(imgURL);
      this.handleUploadImageAll(imgfiles);
    }
  };

  handleUploadImageAll = imgFiles => {
    const {
      firebase: { storage },
    } = this.props;
    const metadata = {
      contentType: 'image/jpg',
    };
    const storageRef = storage().ref(
      `significados/${this.props.word}/imagenes/${imgFiles.name}`
    );

    const uploadTask = storageRef.put(imgFiles, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const isDuration = parseFloat(progress).toFixed(0);
        console.log(`Upload is ${isDuration}% done`);
        this.setState({
          uploadValue: isDuration,
          loaded: true,
        });
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
          this.setState(prevState => ({
            uploadValue: 100,
            imagenes: prevState.imagenes.concat(downloadURL),
          }));
        });
      }
    );
  };

  render() {
    const { uploadValue, loaded, loader } = this.state;
    const classActive = loader ? classes.activeColor : classes.baseColor;
    return (
      <div className={[classes.Uploader, classActive].join(' ')}>
        <input
          type="file"
          name="imagen"
          className={classes.InputFile}
          onChange={this.handleOnFileChange}
          ref={this.props.childRef}
          multiple
          accept="image/*"
        />
        <div className={classes.boxItems}>
          <i className="bx bxs-cloud-upload" />
          <h5>Escogen 4 imagenes</h5>
        </div>
        {loaded ? <Progress value={uploadValue} /> : null}
        <label htmlFor="file" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUploaderImg, addImagenesFiles }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    state => ({
      word: state.createSing.word,
      imgFiles: state.createSing.imgFiles,
    }),
    mapDispatchToProps
  )
)(ImagenesUploader);
