import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './Documento.module.scss';

import Page from './DocumentoPage/DocumentoPage';
import Marker from './DocumentoMarker/DocumentoMarker';
import Video from './DocumentoVideo/DocumentoVideo';

class Documento extends Component {
  render() {
    const { documento } = this.props;
    return (
      <div className={classes.Documento}>
        {!isLoaded(documento) ? (
          <Spinner />
        ) : isEmpty(documento) ? (
          <Empty />
        ) : (
          <div>
            <h1>{documento.tema}</h1>
            <div className={classes.Wrapper}>
              <Marker
                markers={documento.addTimeline}
                onRefUl={ref => (this.refMarkeUl = ref)}
              />
              <Page onRef={ref => (this.refPage = ref)} />
              <Video />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  firestoreConnect(['documentos']),
  connect((state, ownProps) => {
    const id = ownProps.match.params.id;
    const documentos = state.firestore.data.documentos;
    const documento = documentos ? documentos[id] : null;
    return {
      documento,
      durationVideo: state.Documentos.duration,
      timelineVideo: state.Documentos.timeline,
    };
  })
)(Documento);
