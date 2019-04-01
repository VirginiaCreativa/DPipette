import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import SkyLight from 'react-skylight';
import Progress from '../../../../UI/Progress/Progress';
import firebase from '../../../../../config/FirebaseConfig';
import classes from './SenaVideo.module.scss';

import {
  getUploaderVideoSena,
  addUploaderVideoSena,
} from '../../../../../redux/actions/Action';

const videoType = 'video/webm;codecs=vp8';
let localstream;
class SenaVideo extends Component {
  state = {
    recording: false,
    videoSenaBlob: '',
    uploadValue: 0,
    loader: false,
    loaded: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { videoSenaBlob, uploadValue } = this.state;
    // DISPATCH
    this.props.getUploaderVideoSena(videoSenaBlob);
    if (prevState.uploadValue !== uploadValue) {
      if (uploadValue === '100') {
        this.setState({ loaded: false, loader: true });
      }
    }
    if (prevState.videoSenaBlob !== videoSenaBlob) {
      if (videoSenaBlob === null) {
        this.setState({ loader: false });
      }
    }
  }

  handleSenaVideo = () => {
    this.senaVideo.show();
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
    this.video.pause();
    localstream.getTracks()[0].stop();
  };

  startRecording = e => {
    e.preventDefault();
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({ recording: true });
  };

  stopRecording = e => {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({ recording: false });
    this.getVideo();
  };

  getVideo = () => {
    const blob = new Blob(this.chunks, { type: videoType });
    const videoURL = window.URL.createObjectURL(blob);
    this.setState({ videoSenaBlob: videoURL });
  };

  saveVideoClosedSena = () => {
    this.senaVideo.hide();
    const blob = new Blob(this.chunks, { type: videoType });
    const {
      firebase: { storage },
    } = this.props;
    const metadata = {
      contentType: videoType,
    };
    const storageRef = storage().ref(
      `significados/${this.props.word}/videoSena/sena_${this.props.word}`
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
          console.log('imageFile AVAILABLE SENA>>>>', downloadURL);
          this.props.addUploaderVideoSena(downloadURL);
        });
      }
    );
  };

  deleteVideoSena = () => {
    const {
      firebase: { storage },
    } = this.props;
    const storageRef = storage().ref(
      `significados/${this.props.word}/videoSena/sena_${this.props.word}`
    );
    storageRef
      .delete()
      .then(() => {
        console.log('SI DELETE SENA');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    this.setState({ videoSenaBlob: null });
    this.props.addUploaderVideoSena('');
  };

  render() {
    const {
      recording,
      videoSenaBlob,
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
          className={[classes.SenaVideo, loaderClass].join(' ')}
          onClick={this.handleSenaVideo}
          role="presentation">
          <img
            className={classes.Icon}
            alt="Mano seña"
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDM3MC4wNzEgMzcwLjA3MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzcwLjA3MSAzNzAuMDcxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPHBhdGggZD0iTTM1Mi43NTEsMTY2Ljg4bDkuOTA2LTkuOTA2YzQuNzgxLTQuNzgxLDcuNDE0LTExLjEzOCw3LjQxNC0xNy44OTlzLTIuNjMzLTEzLjExOC03LjQxNC0xNy44OTkgICBjLTMuMDY4LTMuMDY4LTYuNzg2LTUuMjQ2LTEwLjg0My02LjQxN2M1LjUyOS05LjY2Nyw0LjE3Ny0yMi4yMjgtNC4wNjctMzAuNDczYy04LjI0OC04LjI0OC0yMC44MTYtOS41OTgtMzAuNDg1LTQuMDYgICBjLTEuMTQ2LTMuOTc1LTMuMjc4LTcuNzIzLTYuNDA0LTEwLjg1Yy05Ljg3LTkuODctMjUuOTI5LTkuODctMzUuNzk5LDBsLTQyLjk2Myw0Mi45NjNjLTMuNDA0LTkuMTY4LTExLjg2Ny0xNi40NzQtMjEuOTI0LTE3LjYwOSAgIGMtMTAuNTc2LTEuMTg4LTIwLjM3Myw0LjM0My0yNS4xMzIsMTMuMTY5Yy0xLjYwMS0yLjk4LTMuODAxLTUuNjM1LTYuNTI2LTcuODA4Yy01LjI4Ny00LjIxNS0xMS44OTktNi4xMTktMTguNjE4LTUuMzYxICAgYy02LjYxMywwLjc0Ni0xMi45NzQsNC4zNC0xNy40NSw5Ljg2Yy0xLjkyNywyLjM3Ni0zLjQyMSw1LjAxMy00LjQ0Niw3Ljc3NWwtNDIuOTktNDIuOTljLTQuNzgxLTQuNzgxLTExLjEzOC03LjQxNC0xNy44OTktNy40MTQgICBzLTEzLjExOSwyLjYzMy0xNy44OTksNy40MTVjLTMuMTI2LDMuMTI2LTUuMjU5LDYuODc0LTYuNDA1LDEwLjg0OWMtOS42NjktNS41MzgtMjIuMjM2LTQuMTg4LTMwLjQ4NSw0LjA2ICAgYy04LjI0NCw4LjI0NC05LjU5NiwyMC44MDYtNC4wNjcsMzAuNDczYy00LjA1NiwxLjE3MS03Ljc3NSwzLjM0OS0xMC44NDMsNi40MTdDMi42MzMsMTI1Ljk1NiwwLDEzMi4zMTMsMCwxMzkuMDc0ICAgczIuNjMzLDEzLjExOCw3LjQxNCwxNy44OTlsOS45MDYsOS45MDZjLTMuNjgzLDEuMjI1LTcuMDU5LDMuMjkzLTkuODgzLDYuMTE3Yy00Ljc4MSw0Ljc4MS03LjQxNCwxMS4xMzgtNy40MTQsMTcuODk5ICAgczIuNjMzLDEzLjExOCw3LjQxNCwxNy44OTlsMTYuNDQzLDE2LjQ0M2MwLjAwNSwwLjAwNSwwLjAxLDAuMDEsMC4wMTUsMC4wMTVsMC42ODUsMC42ODVjMC4wMDEsMC4wMDEsMC4wMDIsMC4wMDIsMC4wMDMsMC4wMDMgICBsNTguNjYyLDU4LjY2MmMxNS4xNTgsMTUuMTU4LDM1LjMxMiwyMy41MDYsNTYuNzQ5LDIzLjUwNmMxNi4zMDYsMCwzMS44NjMtNC44NDIsNDUuMDUxLTEzLjgyNiAgIGMxMy4yNjcsOS4wMDgsMjguOTk5LDEzLjgyNSw0NS4wNTMsMTMuODI1YzIuMDUxLDAsNC4xMDctMC4wNzksNi4xNjQtMC4yMzZjMTkuMDY3LTEuNDY2LDM3LjAyNS05LjcyOSw1MC41NjQtMjMuMjY5bDU4LjY1MS01OC42NSAgIGMwLjAwNS0wLjAwNSwwLjAxLTAuMDEsMC4wMTUtMC4wMTVsMTcuMTQzLTE3LjE0M2M0Ljc4MS00Ljc4MSw3LjQxNC0xMS4xMzgsNy40MTQtMTcuODk5cy0yLjYzMy0xMy4xMTgtNy40MTQtMTcuODk5ICAgQzM1OS44MSwxNzAuMTczLDM1Ni40MzQsMTY4LjEwNSwzNTIuNzUxLDE2Ni44OHogTTE1MC40MzEsMTIyLjIxNWMtMC4zMy0yLjkyNSwwLjcyNC02LjEzNSwyLjg5MS04LjgwNyAgIGMyLjE4Mi0yLjY5MSw1LjE1MS00LjQyOSw4LjE0Ni00Ljc2NmMzLjAwMS0wLjM0MSw1Ljk1OCwwLjUxMiw4LjMyMSwyLjM5NnMzLjg1MSw0LjU3NSw0LjE5Miw3LjZsMy44OTgsMzMuNjA1bC0yNy4wODctMjcuMDg3ICAgTDE1MC40MzEsMTIyLjIxNXogTTkzLjE0NSwyNzQuNzA0bC03NS44MDgtNzUuODA4Yy0yLjEzNy0yLjEzNy0zLjMxMy00Ljk3OC0zLjMxMy04czEuMTc3LTUuODYzLDMuMzEzLTggICBjMi4xMzctMi4xMzcsNC45NzgtMy4zMTQsOC0zLjMxNHM1Ljg2MywxLjE3Nyw4LDMuMzE0YzAuMDAyLDAuMDAyLDAuMDAzLDAuMDAzLDAuMDA1LDAuMDA1bDM4Ljg2NywzOC44NjcgICBjMS4zNjcsMS4zNjcsMy4xNTgsMi4wNSw0Ljk1LDIuMDVzMy41ODMtMC42ODQsNC45NS0yLjA1YzIuNzM0LTIuNzMzLDIuNzM0LTcuMTY2LDAtOS44OTlsLTY0Ljc5NS02NC43OTUgICBjLTQuNDExLTQuNDExLTQuNDExLTExLjU4OSwwLTE2czExLjU4OS00LjQxMSwxNiwwbDY0Ljc5NSw2NC43OTVjMS4zNjcsMS4zNjcsMy4xNTgsMi4wNSw0Ljk1LDIuMDVzMy41ODMtMC42ODQsNC45NS0yLjA1ICAgYzIuNzM0LTIuNzM0LDIuNzM0LTcuMTY2LDAtOS44OTlsLTc1Ljc4NS03NS43ODVjLTQuNDExLTQuNDExLTQuNDExLTExLjU4OSwwLTE2YzQuNDExLTQuNDExLDExLjU4OS00LjQxMSwxNiwwbDc1Ljc4NSw3NS43ODUgICBjMi43MzMsMi43MzMsNy4xNjYsMi43MzMsOS44OTksMGMyLjczNC0yLjczMywyLjczNC03LjE2NiwwLTkuODk5TDY5LjExMiw5NS4yNzVjLTQuNDExLTQuNDExLTQuNDExLTExLjU4OSwwLTE2ICAgczExLjU4OS00LjQxMSwxNiwwbDkzLjE3OSw5My4xNzljMS4wNjksMS4xMjQsMi41MTYsMS45LDQuMTcyLDIuMTE1YzMuNzk5LDAuNDk1LDcuMjg3LTIuMTYyLDcuODI4LTUuOTU0ICAgYzAuMDEtMC4wNzIsMC4wMi0wLjE0NSwwLjAyNy0wLjIxN2w1Ljc3NC00OS43ODNjMC4zMzgtMy4wMDMsMS44MjctNS42OTQsNC4xODktNy41NzhjMi4zNjMtMS44ODQsNS4zMi0yLjczNyw4LjMyMS0yLjM5NiAgIGM2LjI2MywwLjcwNywxMS43MjksNy40MywxMS4wNDQsMTMuNTA2bC0xMy41OTMsMTEwLjg2OWMtMC4wMDYsMC4wNDctMC4wMDUsMC4wOTMtMC4wMSwwLjEzOSAgIGMtMC4wMDUsMC4wNDgtMC4wMTUsMC4wOTQtMC4wMTksMC4xNDJjLTEuMjc4LDE1LjYwOS04LjA5MSwzMC4zMTQtMTkuMTg0LDQxLjQwN2MtMTIuNTE0LDEyLjUxNC0yOS4xNTIsMTkuNDA2LTQ2Ljg0OSwxOS40MDYgICBTMTA1LjY1OCwyODcuMjE4LDkzLjE0NSwyNzQuNzA0eiBNMzUyLjczNSwxOTguODk2bC0xNi40NDUsMTYuNDQ0Yy0wLjAwNCwwLjAwNS0wLjAwOSwwLjAwOS0wLjAxMywwLjAxNGwtNTkuMzUsNTkuMzUgICBjLTIxLjY2NiwyMS42NjUtNTQuNjg3LDI1LjU4MS04MC41MzEsMTAuMjI5YzAuMTE0LTAuMTEyLDAuMjMzLTAuMjE3LDAuMzQ2LTAuMzNjMTMuMzY4LTEzLjM2NywyMS41OTgtMzEuMDcsMjMuMjA3LTQ5Ljg3NSAgIGMwLTAuMDAzLDAuMDAxLTAuMDA1LDAuMDAxLTAuMDA3bDEyLjYzOC0xMDMuMDc1bDUyLjM3MS01Mi4zNzFjMi4xMzctMi4xMzcsNC45NzgtMy4zMTMsOC0zLjMxM3M1Ljg2MywxLjE3Nyw4LDMuMzE0ICAgYzQuNDExLDQuNDExLDQuNDExLDExLjU4OSwwLDE2bC02NC43OTUsNjQuNzk1Yy0yLjczNCwyLjczMy0yLjczNCw3LjE2NiwwLDkuODk5YzIuNzMzLDIuNzMzLDcuMTY2LDIuNzMzLDkuODk5LDBsNzUuNzg1LTc1Ljc4NSAgIGM0LjQxMS00LjQxMSwxMS41ODktNC40MTEsMTYsMHM0LjQxMSwxMS41ODksMCwxNmwtNzUuNzg1LDc1Ljc4NWMtMi43MzQsMi43MzQtMi43MzQsNy4xNjYsMCw5Ljg5OSAgIGMxLjM2NywxLjM2NywzLjE1OCwyLjA1LDQuOTUsMi4wNXMzLjU4My0wLjY4NCw0Ljk1LTIuMDVsNjQuNzk1LTY0Ljc5NWM0LjQxMS00LjQxMSwxMS41ODktNC40MTEsMTYsMHM0LjQxMSwxMS41ODksMCwxNiAgIGwtNjQuNzk1LDY0Ljc5NWMtMi43MzQsMi43MzMtMi43MzQsNy4xNjYsMCw5Ljg5OWMxLjM2NywxLjM2NywzLjE1OCwyLjA1LDQuOTUsMi4wNXMzLjU4My0wLjY4NCw0Ljk1LTIuMDVsMzguODY3LTM4Ljg2NyAgIGMwLjAwMi0wLjAwMiwwLjAwMy0wLjAwMywwLjAwNS0wLjAwNWMyLjEzNy0yLjEzNyw0Ljk3OC0zLjMxNCw4LTMuMzE0czUuODYzLDEuMTc3LDgsMy4zMTQgICBDMzU3LjE0NiwxODcuMzA4LDM1Ny4xNDYsMTk0LjQ4NSwzNTIuNzM1LDE5OC44OTZ6IiBmaWxsPSIjY2VkNmUwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
          />
          {loaded ? <Progress value={uploadValue} /> : <p>Seña</p>}
        </div>
        <SkyLight
          dialogStyles={classPopup}
          closeButtonStyle={classClosedNone}
          hideOnOverlayClicked
          afterClose={this.executeAfterModalClose}
          ref={ref => (this.senaVideo = ref)}>
          <div className="row">
            <div className="col-8">
              <div className={classes.VideoSena}>
                <video width="100%" ref={ref => (this.video = ref)}>
                  Video stream not available.
                </video>
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
            <div className="col-4">
              <div className={classes.VideoGrabado}>
                {videoSenaBlob ? (
                  <div className={classes.BoxVideo}>
                    <video
                      width="100%"
                      src={videoSenaBlob}
                      ref={ref => (this.videoDownd = ref)}
                      muted
                      autoPlay
                      loop
                    />
                    <div className={classes.btnGroup}>
                      <button
                        type="button"
                        onClick={() => this.deleteVideoSena()}
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
  bindActionCreators({ getUploaderVideoSena, addUploaderVideoSena }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    state => ({
      word: state.createSing.word,
    }),
    mapDispatchToProps
  )
)(SenaVideo);
