import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoMarker.module.scss';

import { getTimelineSame } from '../../../../redux/actions/DocumentosAction';

const DocumentoMarker = ({
  markers,
  onRef,
  ID,
  firestore,
  documentos,
  getTimelineSame,
  onTimelSame,
}) => {
  const handleDeleteMarker = (index, item) => {
    const timeDB = documentos[ID].addTimeline;
    firestore.update(`documentos/${ID}`, {
      addTimeline: timeDB.filter(remove => remove !== index),
    });
  };

  const handleTimelineSame = index => {
    getTimelineSame(index.time);
  };

  return (
    <div className={classes.DocumentoMarker}>
      <ul className="list-unstyled">
        {markers.map((item, index) => (
          <li key={index} style={{ top: `${item.height}px` }} ref={onRef}>
            <div
              className={classes.pinMarker}
              role="presentation"
              onClick={() => onTimelSame(item, index)}
            />
            <div
              className={classes.btnDelete}
              role="presentation"
              onClick={() => handleDeleteMarker(item, index)}>
              <i className="bx bx-trash-alt" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTimelineSame }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
    }),
    mapDispatchToProps
  )
)(DocumentoMarker);
