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
import Controls from './DocumentoVideo/Controls';

import {
  getPageHeightDoc,
  isHideTakerMarkerDoc,
  getTimelineVideoDoc,
  getDurationVideoDoc,
  isShowTakerMarkerDoc,
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
    this.props.getPageHeightDoc(this.refPage.clientHeight);
  }

  componentDidUpdate() {
    // const { isDuration, isCurrentTime } = this.state;
    this.props.getPageHeightDoc(this.refPage.clientHeight);

    // const progress = this.refProgress;
    // progress.addEventListener('click', ev => {
    //   const scrubTime = parseFloat(
    //     (ev.offsetX / progress.offsetWidth) * isDuration
    //   );
    //   this.refVideo.currentTime = scrubTime;
    // });
  }

  handleTimelineSame = (item, index) => {
    console.log(item.time);
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

  handleProgressTimilne = ev => {
    console.log(ev.target);
  };

  handleTimelineMarke = (index, item) => {
    this.refVideo.currentTime = item.time;
    this.refVideo.play();
  };

  render() {
    const { documento } = this.props;
    const { isCurrentTime, isDuration, isControlPlay } = this.state;
    this.props.getDurationVideoDoc(isDuration);
    return (
      <div className={classes.Documento}>
        {!isLoaded(documento) ? (
          <Empty />
        ) : isEmpty(documento) ? (
          <Spinner />
        ) : (
          <>
            <div className={classes.BoxVideo}>
              <div className={classes.VideoPlayer}>
                <Controls
                  isCurrentTime={isCurrentTime}
                  isDuration={isDuration}
                  onPlay={this.onPlay}
                  onPause={this.onPause}
                  onMarker={this.onMarker}
                  controlPlay={isControlPlay}
                  onClick={this.handleProgressTimilne}
                  refProgress={refP => (this.refProgress = refP)}
                  onTimeline={this.handleTimelineMarke}
                />
                <video
                  ref={ref => (this.refVideo = ref)}
                  muted
                  preload="true"
                  src="https://firebasestorage.googleapis.com/v0/b/dpipette-ff5ee.appspot.com/o/notescornell%2Fprueba%20materia%201%2Fprueba_1%2Fresumen%2Fprueba_1?alt=media&token=37705e96-54d5-44a6-a6a6-8cd3555a5015"
                  onTimeUpdate={this.handleTimeUpdate}
                  onLoadedData={event =>
                    this.setState({ isDuration: event.target.duration })
                  }
                />
              </div>
              <GetMarker ID={this.props.match.params.id} />
            </div>
            <div className={classes.Page}>
              <Page onRef={c => (this.refPage = c)} />
              <Marker
                markers={documento.addTimeline}
                ID={this.props.match.params.id}
                onRefUl={ref => (this.refMarkeUl = ref)}
                onTimelSame={this.handleTimelineSame}
              />
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
