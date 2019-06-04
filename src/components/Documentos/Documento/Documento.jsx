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
import Video from './DocumentoVideo/DocumentoVideo';
import Header from './DocumentoHeader/DocumentoHeader';
import Config from './DocumentoConfig/DocumentoConfig';
import BuscadorSignficado from '../../Significados/BuscadorSignficado/BuscadorSignficado';

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
    const { isDuration } = this.state;
    this.props.getPageHeightDoc(this.refPage.clientHeight);
    this.props.getDurationVideoDoc(isDuration);
  }

  componentDidUpdate() {
    const { isDuration } = this.state;
    this.props.getDurationVideoDoc(isDuration);
    const progress = this.refProgress;

    if (this.props.hasVideo) {
      progress.addEventListener('click', ev => {
        this.refVideo.currentTime =
          (ev.offsetX / progress.offsetWidth) * isDuration;
      });
      this.refVideo.addEventListener('loadedmetadata', () => {
        if (this.refVideo.buffered.length === 0);
      });
    }
  }

  onPlay = () => {
    this.refVideo.play();
    this.setState({
      isControlPlay: false,
    });
  };

  onPause = () => {
    this.refVideo.pause();
    this.setState({ isControlPlay: true });
  };

  onMarker = () => {
    this.props.getTimelineVideoDoc(this.refVideo.currentTime);
    this.props.isShowTakerMarkerDoc();
    this.setState({
      isControlPlay: false,
    });
  };

  handleTimelineSame = (item, index) => {
    this.refVideo.currentTime = item.time;
    this.refVideo.play();
    this.setState({
      isControlPlay: false,
    });
  };

  handleTimeUpdate = ev => {
    this.setState({
      isCurrentTime: this.refVideo.currentTime,
    });
  };

  handleTimelineMarke = (index, item) => {
    this.refVideo.currentTime = item.time;
    this.refVideo.play();
    this.setState({
      isControlPlay: false,
    });
  };

  render() {
    const { documento, pageGrid, hasVideo, hasPage } = this.props;
    const { isCurrentTime, isControlPlay } = this.state;
    return (
      <div className={classes.Documento}>
        {!isLoaded(documento) ? (
          <Spinner />
        ) : isEmpty(documento) ? (
          <Spinner />
        ) : (
          <>
            <div className={classes.BoxHeader}>
              <Header {...documento} ID={this.props.match.params.id} />
              <Config ID={this.props.match.params.id} {...documento} />
            </div>
            <div className={classes.Wrapper}>
              {documento.pageGrid ? (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-4">
                      <div className={classes.BoxVideo}>
                        <Video
                          {...documento}
                          ID={this.props.match.params.id}
                          isCurrentTime={isCurrentTime}
                          onPlay={this.onPlay}
                          onPause={this.onPause}
                          onMarker={this.onMarker}
                          onControlPlay={isControlPlay}
                          onRefProgress={refP => (this.refProgress = refP)}
                          onTimeline={this.handleTimelineMarke}
                          onRefVideo={ref => (this.refVideo = ref)}
                          onTimeUpdate={this.handleTimeUpdate}
                          onDurationChange={event => {
                            this.setState({
                              isDuration: event.target.duration,
                            });
                          }}
                        />
                        <GetMarker ID={this.props.match.params.id} />
                      </div>
                      {hasPage && (
                        <div className={classes.BoxSearch}>
                          <BuscadorSignficado />
                        </div>
                      )}
                    </div>
                    <div className="col-8">
                      <div className={classes.BoxPageLeft}>
                        <Page
                          onRef={c => (this.refPage = c)}
                          ID={this.props.match.params.id}
                          {...documento}
                        />
                        <Marker
                          {...documento}
                          ID={this.props.match.params.id}
                          onRefUl={ref => (this.refMarkeUl = ref)}
                          onTimelSame={this.handleTimelineSame}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row">
                    <div className="col-8">
                      <div className={classes.BoxPageRight}>
                        <Marker
                          {...documento}
                          ID={this.props.match.params.id}
                          onRefUl={ref => (this.refMarkeUl = ref)}
                          onTimelSame={this.handleTimelineSame}
                        />
                        <Page
                          onRef={c => (this.refPage = c)}
                          ID={this.props.match.params.id}
                          {...documento}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className={classes.BoxVideo}>
                        <Video
                          {...documento}
                          ID={this.props.match.params.id}
                          isCurrentTime={isCurrentTime}
                          onPlay={this.onPlay}
                          onPause={this.onPause}
                          onMarker={this.onMarker}
                          onControlPlay={isControlPlay}
                          onRefProgress={refP => (this.refProgress = refP)}
                          onTimeline={this.handleTimelineMarke}
                          onRefVideo={ref => (this.refVideo = ref)}
                          onTimeUpdate={this.handleTimeUpdate}
                          onDurationChange={event => {
                            this.setState({
                              isDuration: event.target.duration,
                            });
                          }}
                        />
                        <GetMarker ID={this.props.match.params.id} />
                      </div>
                      {hasPage && (
                        <div className={classes.BoxSearch}>
                          <BuscadorSignficado />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
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
      const documento = documentos && documentos[id];
      return {
        documento,
        hasVideo: state.Documentos.hasVideo,
        pageGrid: state.Documentos.pageGrid,
        durationVideo: state.Documentos.duration,
        timelineVideo: state.Documentos.timeline,
        hasPage: state.Documentos.hasPage,
      };
    },
    mapDispatchToProps
  )
)(Documento);
