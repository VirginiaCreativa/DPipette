import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import SkyLight from 'react-skylight';
import ReactQuill from 'react-quill';
import classes from './NoteCornellResumen.module.scss';
import firebase from '../../../../config/FirebaseConfig';

import HeadingResumen from '../UI/HeadingResumen';
import { modules, formats } from '../UI/ControlEditorResumen';
import VideoPlayer from '../../../UI/VideoPlayer/VideoPlayer';

const videoType = 'video/webm;codecs=vp8';

let localstream;
class NoteCornellResumen extends Component {
  state = {
    isResumContent: '',
    isOnEditable: false,
    isSetContents: [],
    recording: false,
    videoBlob: '',
    uploadValue: 0,
    videoResumen: '',
    activeSaveVideo: true,
    uploadProgress: 0,
  };

  componentDidMount() {
    if (this.state.isOnEditable) {
      this.attachQuillRefs();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOnEditable, uploadValue } = this.state;
    if (isOnEditable) {
      this.attachQuillRefs();
    }
    if (uploadValue !== prevState.uploadValue) {
      this.setState({ uploadProgress: uploadValue });
      if (uploadValue === '100') {
        this.setState({ activeSaveVideo: false });
      }
    }
  }

  // ========== EDITOR ==========
  handleEditable = () => {
    this.setState(prevState => ({
      isOnEditable: !prevState.isOnEditable,
    }));
    if (this.state.isOnEditable) {
      this.refView.style.display = 'block';
    } else {
      this.refView.style.display = 'none';
    }
  };

  handleChangeText = value => {
    this.setState({ isResumContent: value });

    const range = this.quillRef.getContents().ops;
    this.setState({ isSetContents: range });

    const id = this.props.docID;
    const db = this.props.firestore;
    db.update(`notescornell/${id}`, {
      getResumen: this.state.isResumContent,
      setResumen: this.state.isSetContents,
    });
  };

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) {
      this.quillRef = quillRef;
    }

    const id = this.props.docID;
    const setResumenDB = this.props.notescornell[id].setResumen;
    this.quillRef.setContents(setResumenDB, 'api');
  };

  // ========== VIDEO GRABADO ==========

  handleVideoRecord = () => {
    this.modalVideo.show();
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then(stream => {
        if ('srcObject' in this.videoGrabado) {
          this.videoGrabado.srcObject = stream;
        } else {
          this.videoGrabado.src = window.URL.createObjectURL(stream);
        }
        localstream = stream;
        this.videoGrabado.play();
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: videoType,
        });
        this.chunks = [];
        this.mediaRecorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) {
            this.chunks.push(e.data);
          }
        };
      })
      .catch(err => {
        console.log(err.name, err.message);
      });
  };

  executeAfterModalClose = () => {
    this.videoGrabado.pause();
    localstream.getTracks()[0].stop();
  };

  startRecording = e => {
    e.preventDefault();
    this.mediaRecorder.start(10);
    this.setState({ recording: true });
  };

  stopRecording = e => {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({ recording: false });
    this.getGrabado();
  };

  getGrabado = () => {
    const blob = new Blob(this.chunks, { type: videoType });
    const videoURL = window.URL.createObjectURL(blob);
    this.setState({ videoBlob: videoURL });
    const metadata = {
      contentType: videoType,
    };
    const id = this.props.docID;
    const materia = this.props.notescornell[id].materia.toLowerCase();
    const tema = this.props.notescornell[id].tema.toLowerCase();
    const temaNotSpace = tema.replace(/ +/g, '_');

    const {
      firebase: { storage },
    } = this.props;
    const storageRef = storage().ref(`notescornell/${materia}/${temaNotSpace}`);

    const uploadTask = storageRef.put(blob, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const isDuration = parseFloat(progress).toFixed(0);
        console.log(`Upload is ${isDuration}% done`);
        this.setState({ uploadValue: isDuration, activeSaveVideo: true });
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
          default:
            console.log('Not Upload');
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
            console.log('Not Upload');
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('imageFile AVAILABLE SENA>>>>', downloadURL);
          this.setState({ videoResumen: downloadURL });
        });
      }
    );
  };

  saveVideoClosedSena = () => {
    this.modalVideo.hide();
    const id = this.props.docID;
    const db = this.props.firestore;
    db.update(`notescornell/${id}`, {
      videoResumen: this.state.videoResumen,
    });
  };

  deleteVideoSena = () => {
    const {
      firebase: { storage },
    } = this.props;
    const id = this.props.docID;
    const materia = this.props.notescornell[id].materia.toLowerCase();
    const tema = this.props.notescornell[id].tema.toLowerCase();
    const temaNotSpace = tema.replace(/ +/g, '_');
    const storageRef = storage().ref(`notescornell/${materia}/${temaNotSpace}`);

    storageRef
      .delete()
      .then(() => {
        console.log('SI DELETE SENA');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    this.setState({ videoBlob: null });
    const db = this.props.firestore;
    db.update(`notescornell/${id}`, {
      videoResumen: null,
    });
  };

  render() {
    const { getResumen, videoResumen } = this.props;
    const {
      isResumContent,
      isOnEditable,
      recording,
      videoBlob,
      uploadProgress,
      activeSaveVideo,
    } = this.state;

    const classPopup = {
      width: '65%',
      top: '30%',
      left: '20%',
      marginTop: '-100px',
      marginLeft: '-30px',
    };
    const classClosedNone = { display: 'none' };
    const classVideoUpload = {
      width: `${uploadProgress}%`,
    };
    const viewContent = (
      <div dangerouslySetInnerHTML={{ __html: getResumen }} />
    );
    return (
      <div className={classes.NoteCornellResumen}>
        <HeadingResumen
          title="Resumen"
          onClickEditable={this.handleEditable}
          onClickVideo={this.handleVideoRecord}
          onActiveEditable={isOnEditable}
        />
        {/* CONFIG */}
        <div className={classes.BoxGroup}>
          {isOnEditable ? (
            <ReactQuill
              ref={e => (this.reactQuillRef = e)}
              defaultValue={isResumContent || ''}
              onChange={this.handleChangeText}
              className={classes.BoxEditor}
              modules={modules}
              formats={formats}
            />
          ) : null}
          <SkyLight
            hideOnOverlayClicked
            dialogStyles={classPopup}
            closeButtonStyle={classClosedNone}
            afterClose={this.executeAfterModalClose}
            ref={ref => (this.modalVideo = ref)}>
            <div className="row">
              <div className="col-8">
                <div className={classes.BoxVideGrabado}>
                  <video width="100%" ref={ref => (this.videoGrabado = ref)} />
                  <div className={classes.ControlVideo}>
                    {!recording ? (
                      <button
                        type="button"
                        onClick={e => this.startRecording(e)}
                        className={classes.btnRecord}>
                        <i className="bx bx-radio-circle-marked" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={e => this.stopRecording(e)}
                        className={classes.btnStop}>
                        <i className="bx bx-stop" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className={classes.BoxVideoResult}>
                  {videoBlob ? (
                    <>
                      <div className={classes.BoxVideo}>
                        <div
                          className={classes.showUpload}
                          style={classVideoUpload}
                        />
                        <video
                          width="100%"
                          src={videoBlob}
                          ref={ref => (this.videoDownd = ref)}
                          muted
                          autoPlay
                          loop
                        />
                      </div>
                      <div className={classes.GroupBtns}>
                        <button
                          type="button"
                          onClick={() => this.deleteVideoSena()}
                          className="btn btn-danger mr-1">
                          <i className="bx bx-trash-alt" />
                          Eliminar
                        </button>
                        {activeSaveVideo ? (
                          <button
                            type="button"
                            disabled={activeSaveVideo}
                            onClick={() => this.saveVideoClosedSena()}
                            className="btn btn-light">
                            <i className="bx bxs-cloud-upload" />
                            Progreso
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={activeSaveVideo}
                            onClick={() => this.saveVideoClosedSena()}
                            className="btn btn-success">
                            <i className="bx bx-check" />
                            Guardar
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className={classes.BoxAprobado}>
                      <h5>APROBACIÓN DE ESTE VIDEO</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SkyLight>
        </div>
        {/* VIEW RESUMEN */}
        <div className={classes.BoxView} ref={e => (this.refView = e)}>
          <div className="row">
            <div className="col">
              <div className={classes.BoxEditorResumen}>{viewContent}</div>
            </div>
            <div className="col">
              {videoResumen && <VideoPlayer srcVideo={videoResumen} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(['notescornell']),
  connect(state => ({
    notescornell: state.firestore.data.notescornell,
  }))
)(NoteCornellResumen);
