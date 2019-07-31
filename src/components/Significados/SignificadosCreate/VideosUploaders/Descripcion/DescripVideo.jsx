/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import SkyLight from 'react-skylight';
import Progress from '../../../../UI/Progress/Progress';
import firebase from '../../../../../config/FirebaseConfig';
import classes from './DescripVideo.module.scss';

import {
  getUploaderVideoDescrip,
  addUploaderVideoDescrip,
} from '../../../../../redux/actions/SignificadosAction';

const videoType = 'video/webm;codecs=vp9';
let localstream;
let chunks;
let mediaRecorder;
class DescripciónVideo extends Component {
  state = {
    recording: false,
    videoDescripBlob: '',
    uploadValue: 0,
    loader: false,
    loaded: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { videoDescripBlob, uploadValue } = this.state;
    // DISPATCH
    this.props.getUploaderVideoDescrip(videoDescripBlob);
    if (prevState.uploadValue !== uploadValue) {
      if (uploadValue === '100') {
        this.setState({ loaded: false, loader: true });
      }
    }
    if (prevState.videoDescripBlob !== videoDescripBlob) {
      if (videoDescripBlob === null) {
        this.setState({ loader: false });
      }
    }
  }

  handleDescripVideo = () => {
    this.descripVideo.show();
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then(stream => {
        if ('srcObject' in this.video) {
          this.video.srcObject = stream;
        } else {
          this.video.src = window.URL.createObjectURL(stream);
        }
        localstream = stream;
        this.video.play();
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
    this.video.pause();
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
    this.getVideo();
  };

  getVideo = () => {
    const blob = new Blob(chunks, { type: videoType });
    const videoURL = window.URL.createObjectURL(blob);
    this.setState({ videoDescripBlob: videoURL });
  };

  saveVideoClosedSena = () => {
    this.descripVideo.hide();
    const blob = new Blob(chunks, { type: videoType });
    const {
      firebase: { storage },
    } = this.props;
    const metadata = {
      contentType: videoType,
      name: this.props.word,
    };
    const storageRef = storage().ref(
      // eslint-disable-next-line prettier/prettier
      `significados/${this.props.word}/videos/descripcion/descripcion_${this.props.word}`
    );

    const uploadTask = storageRef.put(blob, metadata);

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
            console.log('Upload');
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
          console.log('imageFile AVAILABLE DESCRIPCION >>>>', downloadURL);
          this.props.addUploaderVideoDescrip(downloadURL);
        });
      }
    );
  };

  deleteVideo = () => {
    const {
      firebase: { storage },
    } = this.props;
    const storageRef = storage().ref(
      `significados/${this.props.word}/videoDescripcion/descripcion_${this.props.word}`
    );
    storageRef
      .delete()
      .then(() => {
        console.log('SI DELETE DESCRIP');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    this.setState({ videoDescripBlob: null });
    this.props.addUploaderVideoDescrip('');
  };

  render() {
    const {
      recording,
      videoDescripBlob,
      uploadValue,
      loaded,
      loader,
    } = this.state;
    const classPopup = {
      width: '65%',
      top: '30%',
      left: '20%',
      marginTop: '-100px',
      marginLeft: '-30px',
    };
    const classClosedNone = { display: 'none' };
    const loaderClass = loader ? classes.activeUpload : classes.baseItem;
    return (
      <>
        <div
          className={[classes.DescripciónVideo, loaderClass].join(' ')}
          onClick={this.handleDescripVideo}
          role="presentation">
          <img
            className={classes.Icon}
            alt="Descripción una mujer Icon"
            src="data:image/svg+xml;base64,
  PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgwIDQ4MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIj48Zz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xNjAsMEM5My43MjYsMCw0MCw1My43MjYsNDAsMTIwdjg4YzAuMDM1LDMwLjkxMywyNS4wODcsNTUuOTY1LDU2LDU2aDh2LTE2aC04Yy0yMi4wOC0wLjAyNi0zOS45NzQtMTcuOTItNDAtNDB2LTg4ICAgIGMwLTU3LjQzOCw0Ni41NjItMTA0LDEwNC0xMDRzMTA0LDQ2LjU2MiwxMDQsMTA0djg4Yy0wLjAyNiwyMi4wOC0xNy45MiwzOS45NzQtNDAsNDBoLTh2MTZoOGMzMC45MTMtMC4wMzUsNTUuOTY1LTI1LjA4Nyw1Ni01NiAgICB2LTg4QzI4MCw1My43MjYsMjI2LjI3NCwwLDE2MCwweiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojQ0VENkUwIiBkYXRhLW9sZF9jb2xvcj0iI2NlZDZlMCI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNjUuOTI4LDM3Ny4wMzJsNS44NDgtOS4yMDhsLTEzLjUxMi04LjU3NmwtNS44NDgsOS4yMTZjLTE3LjY4NywyNy44NzItMTYuMzc0LDYzLjc2LDMuMzA0LDkwLjI2NFY0ODBoMTZ2LTI0ICAgIGMwLjAwMS0xLjgxNy0wLjYxNy0zLjU4MS0xLjc1Mi01QzUyLjk2LDQyOS43MzgsNTEuMzM3LDQwMC4wMiw2NS45MjgsMzc3LjAzMnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0NFRDZFMCIgZGF0YS1vbGRfY29sb3I9IiNjZWQ2ZTAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ0MCwwSDMzNmMtMjIuMDgsMC4wMjYtMzkuOTc0LDE3LjkyLTQwLDQwdjgwYzAuMDI2LDIyLjA4LDE3LjkyLDM5Ljk3NCw0MCw0MGgxNnYzMiAgICBjLTAuMDAxLDMuMjM1LDEuOTQ3LDYuMTUzLDQuOTM2LDcuMzkyYzAuOTcxLDAuNDA1LDIuMDEyLDAuNjExLDMuMDY0LDAuNjA4YzIuMTIyLDAsNC4xNTYtMC44NDQsNS42NTYtMi4zNDRMNDAzLjMxMiwxNjBINDQwICAgIGMyMi4wOC0wLjAyNiwzOS45NzQtMTcuOTIsNDAtNDBWNDBDNDc5Ljk3NCwxNy45Miw0NjIuMDgsMC4wMjYsNDQwLDB6IE00NjQsMTIwYzAsMTMuMjU1LTEwLjc0NSwyNC0yNCwyNGgtNDAgICAgYy0yLjEyMiwwLTQuMTU2LDAuODQ0LTUuNjU2LDIuMzQ0TDM2OCwxNzIuNjg4VjE1MmMwLTQuNDE4LTMuNTgyLTgtOC04aC0yNGMtMTMuMjU1LDAtMjQtMTAuNzQ1LTI0LTI0VjQwICAgIGMwLTEzLjI1NSwxMC43NDUtMjQsMjQtMjRoMTA0YzEzLjI1NSwwLDI0LDEwLjc0NSwyNCwyNFYxMjB6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNDRUQ2RTAiIGRhdGEtb2xkX2NvbG9yPSIjY2VkNmUwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxyZWN0IHg9IjMzNiIgeT0iNDAiIHdpZHRoPSI1NiIgaGVpZ2h0PSIxNiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojQ0VENkUwIiBkYXRhLW9sZF9jb2xvcj0iI2NlZDZlMCI+PC9yZWN0PgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cmVjdCB4PSI0MDgiIHk9IjQwIiB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0NFRDZFMCIgZGF0YS1vbGRfY29sb3I9IiNjZWQ2ZTAiPjwvcmVjdD4KCTwvZz4KPC9nPjxnPgoJPGc+CgkJPHJlY3QgeD0iMzM2IiB5PSI3MiIgd2lkdGg9IjEwNCIgaGVpZ2h0PSIxNiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojQ0VENkUwIiBkYXRhLW9sZF9jb2xvcj0iI2NlZDZlMCI+PC9yZWN0PgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cmVjdCB4PSIzMzYiIHk9IjEwNCIgd2lkdGg9IjU2IiBoZWlnaHQ9IjE2IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNDRUQ2RTAiIGRhdGEtb2xkX2NvbG9yPSIjY2VkNmUwIj48L3JlY3Q+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yNjcuNTg0LDM2OC40NjRsLTUuODQ4LTkuMjE2bC0xMy41MTIsOC41NzZsNS44NDgsOS4yMTZjMTQuNTkyLDIyLjk4NSwxMi45NjksNTIuNzAxLTQuMDQsNzMuOTYgICAgYy0xLjEzNSwxLjQxOS0xLjc1MywzLjE4My0xLjc1Miw1djI0aDE2di0yMS4yNzJDMjgzLjk1OCw0MzIuMjI0LDI4NS4yNzEsMzk2LjMzNiwyNjcuNTg0LDM2OC40NjR6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNDRUQ2RTAiIGRhdGEtb2xkX2NvbG9yPSIjY2VkNmUwIj48L3BhdGg+Cgk8L2c+CjwvZz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NzIsMjcyaC03MmMtMzAuMDE2LDAuMDM1LTU0LjY2NiwyMy43MjktNTUuODg4LDUzLjcyTDMyMCwzNjkuMTI4VjMzNmMtMC4wMzUtMzAuOTEzLTI1LjA4Ny01NS45NjUtNTYtNTZoLTI5LjI0ICAgIGwtMC4yMTYtMC4xNjhMMjM0LjQsMjgwSDIxNmMtOC44MzcsMC0xNi03LjE2My0xNi0xNnYtMTguODI0YzI0LjcxOS0xNC4yNzIsMzkuOTYyLTQwLjYzMyw0MC02OS4xNzZ2LTY0ICAgIGMtMC4wMTItMTMuMjU1LTMuMzEtMjYuMy05LjYtMzcuOTY4Yy0yLjAxNS0zLjcxMi02LjU2OS01LjIxOS0xMC40LTMuNDRMODQuNTkyLDEzNC4zMDRjLTIuODA0LDEuMzItNC41OTMsNC4xNDEtNC41OTIsNy4yNFYxNzYgICAgYzAuMDM4LDI4LjU0MywxNS4yODEsNTQuOTA0LDQwLDY5LjE3NlYyNjRjMCw4LjgzNy03LjE2MywxNi0xNiwxNkg1NmMtMzAuOTEzLDAuMDM1LTU1Ljk2NSwyNS4wODctNTYsNTZ2MTQ0aDE2VjMzNiAgICBjMC4wMjYtMjIuMDgsMTcuOTItMzkuOTc0LDQwLTQwaDI1LjQ1Nmw3Mi4wNCwxMDAuNjU2YzEuNDgsMi4wNjksMy44NTYsMy4zMSw2LjQsMy4zNDRIMTYwYzIuNTE4LDAsNC44ODktMS4xODYsNi40LTMuMmw3Ni0xMDAuOCAgICBIMjY0YzIyLjA4LDAuMDI2LDM5Ljk3NCwxNy45Miw0MCw0MHY2NGMwLjAwNCw0LjQxOCwzLjU4OSw3Ljk5Nyw4LjAwNyw3Ljk5M2MyLjkwMi0wLjAwMyw1LjU3NS0xLjU3Niw2Ljk4NS00LjExM0wzNTYuNzA0LDMzNiAgICBoNDUuODY0bC03OCwxNDRoMTguMkw0MjAuOCwzMzZoMy4yYzMwLjkxMy0wLjAzNSw1NS45NjUtMjUuMDg3LDU2LTU2QzQ4MCwyNzUuNTgyLDQ3Ni40MTgsMjcyLDQ3MiwyNzJ6IE05NiwxNzZ2LTI5LjM3NiAgICBsMTIzLjUyOC01OC4xMjhDMjIyLjQ4Myw5NS45OCwyMjQsMTAzLjk1NCwyMjQsMTEydjY0YzAsMzUuMzQ2LTI4LjY1NCw2NC02NCw2NEMxMjQuNjU0LDI0MCw5NiwyMTEuMzQ2LDk2LDE3NnogTTE2MC4xNjgsMzc4LjQ5NiAgICBMMTM1LjQ4LDM0NGg1MC42ODhMMTYwLjE2OCwzNzguNDk2eiBNMTk4LjI3MiwzMjhIMTI0bC0yMi45MDQtMzJIMTA0YzE3LjY3MywwLDMyLTE0LjMyNywzMi0zMnYtMTEuNjg4ICAgIGMxNS42MjIsNC45MTcsMzIuMzc4LDQuOTE3LDQ4LDBWMjY0YzAsMTcuNjczLDE0LjMyNywzMiwzMiwzMmg2LjRMMTk4LjI3MiwzMjh6IE00MjQsMzIwaC02My4yICAgIGMzLjgyNS0xOC42MTMsMjAuMTk4LTMxLjk3OSwzOS4yLTMyaDYzLjJDNDU5LjM3NSwzMDYuNjEzLDQ0My4wMDIsMzE5Ljk3OSw0MjQsMzIweiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojQ0VENkUwIiBkYXRhLW9sZF9jb2xvcj0iI2NlZDZlMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4="
          />
          {loaded ? <Progress value={uploadValue} /> : <p>Descripción</p>}
        </div>
        <SkyLight
          dialogStyles={classPopup}
          closeButtonStyle={classClosedNone}
          hideOnOverlayClicked
          afterClose={this.executeAfterModalClose}
          ref={ref => (this.descripVideo = ref)}>
          <div className="row">
            <div className="col-8">
              <div className={classes.VideoDescrip}>
                <video width="100%" ref={ref => (this.video = ref)} />
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
              <div className={classes.VideoGrabado}>
                {videoDescripBlob ? (
                  <div className={classes.BoxVideo}>
                    <video
                      width="100%"
                      src={videoDescripBlob}
                      ref={ref => (this.videoDownd = ref)}
                      muted
                      autoPlay
                      loop
                    />
                    <div className={classes.btnGroup}>
                      <button
                        type="button"
                        onClick={() => this.deleteVideo()}
                        className="btn btn-danger mr-1">
                        <i className="bx bx-trash-alt" />
                        Eliminar
                      </button>
                      <button
                        type="button"
                        onClick={() => this.saveVideoClosedSena()}
                        className="btn btn-success">
                        <i className="bx bxs-cloud-upload" />
                        Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={classes.BoxAprobado}>
                    <h5>APROBACIÓN DE ESTE VIDEO</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SkyLight>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getUploaderVideoDescrip, addUploaderVideoDescrip },
    dispatch
  );

export default compose(
  firebaseConnect(),
  connect(
    state => ({
      word: state.Significados.word,
    }),
    mapDispatchToProps
  )
)(DescripciónVideo);
