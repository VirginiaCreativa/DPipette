import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from './UI/Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './Documento.module.scss';

import Page from './DocumentoPage/DocumentoPage';
import Marker from './DocumentoMarker/DocumentoMarker';
import GetMarker from './DocumentoVideo/DocumentoGetMarker';
import Controls from './DocumentoVideo/DocumentoControls';
import Header from './DocumentoHeader/DocumentoHeader';
import Config from './DocumentoConfig/DocumentoConfig';

import {
  getPageHeightDoc,
  isHideTakerMarkerDoc,
  getTimelineVideoDoc,
  getDurationVideoDoc,
  isShowTakerMarkerDoc,
  getTimePlayVideoDoc,
} from '../../../redux/actions/DocumentosAction';

class Documento extends Component {
  constructor(props) {
    super(props);
    this.refPage = React.createRef();
    this.refVideo = React.createRef();
    this.refProgress = React.createRef();
  }

  state = {
    bodyHeight: 0,
    isPlayer: 0,
    isDuration: 0,
    isCurrentTime: 0,
    isControlPlay: true,
  };

  componentDidMount() {
    const { isDuration } = this.state;
    this.props.getPageHeightDoc(this.refPage.clientHeight);
    this.props.getDurationVideoDoc(isDuration);
  }

  componentDidUpdate() {
    const { isDuration } = this.state;
    this.props.getDurationVideoDoc(isDuration);
    this.props.getPageHeightDoc(this.refPage.clientHeight);
    const progress = this.refProgress;
    progress.addEventListener('click', ev => {
      this.refVideo.currentTime =
        (ev.offsetX / progress.offsetWidth) * isDuration;
    });

    this.refVideo.addEventListener('loadedmetadata', () => {
      if (this.refVideo.buffered.length === 0);
    });
  }

  handleTimelineSame = (item, index) => {
    this.refVideo.currentTime = item.time;
    this.refVideo.play();
  };

  onPlay = () => {
    this.refVideo.play();
    const { isControlPlay } = this.state;
    this.setState({
      isControlPlay: !isControlPlay,
    });
  };

  onPause = () => {
    const { isControlPlay } = this.state;
    this.refVideo.pause();
    this.setState({ isControlPlay: !isControlPlay });
  };

  onMarker = () => {
    this.props.getTimelineVideoDoc(this.refVideo.currentTime);
    this.props.isShowTakerMarkerDoc();
  };

  handleTimeUpdate = ev => {
    this.setState({
      isCurrentTime: this.refVideo.currentTime,
    });
  };

  handleTimelineMarke = (index, item) => {
    const { isControlPlay } = this.state;
    this.refVideo.currentTime = item.time;
    this.refVideo.play();
    this.setState({
      isControlPlay: !isControlPlay,
    });
  };

  render() {
    const { documento } = this.props;
    const { isCurrentTime, isDuration, isControlPlay } = this.state;
    console.log(isDuration);
    return (
      <div className={classes.Documento}>
        {!isLoaded(documento) ? (
          <Empty />
        ) : isEmpty(documento) ? (
          <Spinner />
        ) : (
          <>
            <div className={classes.BoxHeader}>
              <div className="row">
                <div className="col-9">
                  <Header {...documento} ID={this.props.match.params.id} />
                </div>
                <div className="col-3">
                  <Config />
                </div>
              </div>
            </div>
            <div className={classes.Wrapper}>
              <div className={classes.BoxVideo}>
                <div className={classes.VideoPlayer}>
                  <Controls
                    isCurrentTime={isCurrentTime}
                    isDuration={isDuration}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onMarker={this.onMarker}
                    controlPlay={isControlPlay}
                    refProgress={refP => (this.refProgress = refP)}
                    onTimeline={this.handleTimelineMarke}
                  />
                  <video
                    ref={ref => (this.refVideo = ref)}
                    muted
                    preload="auto"
                    src="https://firebasestorage.googleapis.com/v0/b/dpipette-ff5ee.appspot.com/o/notescornell%2Fprueba%20materia%201%2Fprueba_1%2Fresumen%2Fprueba_1?alt=media&token=37705e96-54d5-44a6-a6a6-8cd3555a5015"
                    onTimeUpdate={this.handleTimeUpdate}
                    onDurationChange={event => {
                      this.setState({ isDuration: event.target.duration });
                    }}
                  />
                </div>
                <GetMarker ID={this.props.match.params.id} />
              </div>
              <div className={classes.BoxPage}>
                <Page onRef={c => (this.refPage = c)} />
                <Marker
                  markers={documento.addTimeline}
                  ID={this.props.match.params.id}
                  onRefUl={ref => (this.refMarkeUl = ref)}
                  onTimelSame={this.handleTimelineSame}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPageHeightDoc,
      isHideTakerMarkerDoc,
      getTimelineVideoDoc,
      getDurationVideoDoc,
      isShowTakerMarkerDoc,
      getTimePlayVideoDoc,
    },
    dispatch
  );

export default compose(
  firestoreConnect(['documentos']),
  connect(
    (state, ownProps) => {
      const id = ownProps.match.params.id;
      const documentos = state.firestore.data.documentos;
      const documento = documentos ? documentos[id] : null;
      return {
        documento,
        durationVideo: state.Documentos.duration,
        timelineVideo: state.Documentos.timeline,
      };
    },
    mapDispatchToProps
  )
)(Documento);
