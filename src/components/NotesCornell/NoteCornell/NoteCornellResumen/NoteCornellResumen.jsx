/* eslint-disable no-var */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import createInlineToolbarPlugin, {
  Separator,
} from 'draft-js-inline-toolbar-plugin';
import Editor from 'draft-js-plugins-editor';
import SkyLight from 'react-skylight';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './NoteCornellResumen.module.scss';
import firebase from '../../../../config/FirebaseConfig';
import HeadingResumen from '../UI/HeadingResumen';
import VideoPlayer from '../../../UI/VideoPlayerAuto/VideoPlayer';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const videoType = 'video/webm;codecs=vp9';
let localstream;
var mediaRecorder;
var chunks;
class NoteCornellResumen extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    recording: false,
    videoBlob: '',
    uploadValue: 0,
    videoResumen: null,
    activeSaveVideo: true,
    uploadProgress: 0,
    isShowVideo: false,
  };

  componentDidMount() {
    const { videoResumen } = this.state;
    const id = this.props.docID;
    const videoResumenDB = this.props.notescornell[id].videoResumen;
    if (this.state.setResumen === null) {
      this.setState({ editorState: EditorState.createEmpty() });
    } else {
      this.setContentData();
      this.setState({ editorState: this.onContentData() });
    }
    console.log('====>', this.state.videoResumen);
    if (videoResumen === videoResumenDB) {
      this.setState({ isShowVideo: true });
    } else {
      this.setState({ isShowVideo: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { uploadValue, editorState, videoResumen } = this.state;
    if (editorState !== prevState.editorState) {
      this.setContentData();
    }
    if (uploadValue !== prevState.uploadValue) {
      this.setState({ uploadProgress: uploadValue });
      if (uploadValue === '100') {
        this.setState({ activeSaveVideo: false });
      }
    }
    if (videoResumen !== prevState.videoResumen) {
      this.setState({ isShowVideo: false });
    }
  }

  // ========== EDITOR ==========
  onContentData = () => {
    const id = this.props.docID;
    const getResumen = this.props.notescornell[id].getResumen;
    const blocks = convertFromRaw(JSON.parse(getResumen));
    const editorState = EditorState.createWithContent(blocks, null);
    return editorState;
  };

  setContentData = () => {
    const id = this.props.docID;
    const db = this.props.firestore;
    const getResumen = this.props.notescornell[id].getResumen;
    db.update(`notescornell/${id}`, {
      setResume: getResumen,
    });
  };

  onEditorStateChange = editorState => {
    const contentState = editorState.getCurrentContent();
    this.onContentSave(contentState);
    this.setState({
      editorState,
    });
  };

  onContentSave = contentSave => {
    const id = this.props.docID;
    const db = this.props.firestore;
    const content = JSON.stringify(convertToRaw(contentSave));
    db.update(`notescornell/${id}`, {
      getResumen: content,
    });
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
        mediaRecorder = new MediaRecorder(stream, {
          mimeType: videoType,
        });
        chunks = [];
        mediaRecorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
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
    chunks = [];
    mediaRecorder.start(10);
    this.setState({ recording: true });
  };

  stopRecording = e => {
    e.preventDefault();
    mediaRecorder.stop();
    this.setState({ recording: false });
    this.getGrabado();
  };

  getGrabado = () => {
    const blob = new Blob(chunks, { type: videoType });
    const videoURL = window.URL.createObjectURL(blob);
    this.setState({ videoBlob: videoURL });
    const metadata = {
      contentType: videoType,
    };
    const id = this.props.docID;
    const materiaFB = this.props.notescornell[id].materia.toLowerCase();
    const temaFB = this.props.notescornell[id].tema.toLowerCase();
    const materia = CleanUpSpecialChars(materiaFB);
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');

    const {
      firebase: { storage },
    } = this.props;
    const storageRef = storage().ref(
      `notescornell/${materia}/${temaNotSpace}/resumen/video`
    );

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
          console.log('Aprobado DownloadURL', downloadURL);
          this.setState({ videoResumen: downloadURL, isShowVideo: false });
        });
      }
    );
  };

  saveVideoClosedResumen = () => {
    this.modalVideo.hide();
    const id = this.props.docID;
    const db = this.props.firestore;
    db.update(`notescornell/${id}`, {
      videoResumen: this.state.videoResumen,
    });
    this.setState({ isShowVideo: false });
  };

  deleteVideoResumen = () => {
    const {
      firebase: { storage },
    } = this.props;
    const id = this.props.docID;
    const materiaFB = this.props.notescornell[id].materia.toLowerCase();
    const temaFB = this.props.notescornell[id].tema.toLowerCase();
    const materia = CleanUpSpecialChars(materiaFB);
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');
    const storageRef = storage().ref(
      `notescornell/${materia}/${temaNotSpace}/resumen/video`
    );

    storageRef
      .delete()
      .then(() => {
        console.log('SI DELETE SENA');
        this.setState({ videoBlob: null, isShowVideo: true });
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    const db = this.props.firestore;
    db.update(`notescornell/${id}`, {
      videoResumen: null,
    });
  };

  render() {
    const { videoResumen, tema, docID } = this.props;
    const {
      recording,
      videoBlob,
      uploadProgress,
      activeSaveVideo,
      editorState,
      isShowVideo,
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

    return (
      <div className={classes.NoteCornellResumen}>
        <HeadingResumen title="Resumen" />
        <div className={classes.BoxGroup}>
          <div className="row">
            <div className="col">
              <div className={classes.Editor}>
                <Editor
                  editorState={editorState}
                  onChange={this.onEditorStateChange}
                  plugins={plugins}
                  placeholder="Escribir aquí..."
                />
                <InlineToolbar>
                  {externalProps => (
                    <div>
                      <BoldButton {...externalProps} />
                      <ItalicButton {...externalProps} />
                      <UnderlineButton {...externalProps} />
                      <Separator {...externalProps} />
                      <UnorderedListButton {...externalProps} />
                      <OrderedListButton {...externalProps} />
                      <BlockquoteButton {...externalProps} />
                    </div>
                  )}
                </InlineToolbar>
              </div>
            </div>
            <div className="col">
              {isShowVideo ? (
                <div className={classes.BoxVideoClick}>
                  <button type="button" onClick={this.handleVideoRecord}>
                    <i className="bx bx-video" />
                  </button>
                  <p>Grabado para expresar tu resumen</p>
                </div>
              ) : (
                <div className={classes.VideoResumen}>
                  <button
                    type="button"
                    onClick={() => this.deleteVideoResumen()}>
                    <i className="bx bxs-x-circle" />
                  </button>
                  <VideoPlayer src={videoResumen} title={tema} />
                </div>
              )}
            </div>
          </div>
        </div>
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
                        onClick={() => this.deleteVideoResumen()}
                        className="btn btn-danger mr-1">
                        <i className="bx bx-trash-alt" />
                        Eliminar
                      </button>
                      {activeSaveVideo ? (
                        <button
                          type="button"
                          disabled={activeSaveVideo}
                          onClick={() => this.saveVideoClosedResumen()}
                          className="btn btn-light">
                          <i className="bx bxs-cloud-upload" />
                          Progreso
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={activeSaveVideo}
                          onClick={() => this.saveVideoClosedResumen()}
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
    );
  }
}

export default compose(
  firestoreConnect(['notescornell']),
  connect(state => ({
    notescornell: state.firestore.data.notescornell,
  }))
)(NoteCornellResumen);
