import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from './UI/Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './Documento.module.scss';

import Page from './DocumentoPage/DocumentoPage';
import Marker from './DocumentoMarker/DocumentoMarker';
import Video from './DocumentoVideo/DocumentoVideo';

import { getPageHeightDoc } from '../../../redux/actions/DocumentosAction';

class Documento extends Component {
  constructor(props) {
    super(props);
    this.refPage = React.createRef();
  }

  state = {
    bodyHeight: 0,
  };

  componentDidMount() {
    this.props.getPageHeightDoc(this.refPage.clientHeight);
  }

  componentDidUpdate() {
    this.props.getPageHeightDoc(this.refPage.clientHeight);
  }

  render() {
    const { documento } = this.props;
    return (
      <div className={classes.Documento}>
        {!isLoaded(documento) ? (
          <Empty />
        ) : isEmpty(documento) ? (
          <Spinner />
        ) : (
          <>
            <div className={[classes.Video, 'img-fluid'].join('')}>
              <Video ID={this.props.match.params.id} {...document} />
            </div>
            <div className={classes.Page}>
              <Page onRef={c => (this.refPage = c)} />
              <Marker
                markers={documento.addTimeline}
                ID={this.props.match.params.id}
                onRefUl={ref => (this.refMarkeUl = ref)}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPageHeightDoc }, dispatch);

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
