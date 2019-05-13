import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import classes from './DocumentoMarker.module.scss';

const DocumentoMarker = ({ markers, onRef, ID, firestore, documentos }) => {
  const handleDeleteMarker = index => {
    const makresDB = documentos[ID].addTimeline;
    console.log(index, makresDB);
    firestore.update(`documentos/${ID}`, {
      addTimeline: makresDB.filter(delMaker => delMaker !== index),
    });
  };
  return (
    <div className={classes.DocumentoMarker}>
      <ul className="list-unstyled">
        {markers.map((item, index) => (
          <li
            key={index}
            style={{ top: `${item}px` }}
            ref={onRef}
            role="presentation"
            onClick={() => handleDeleteMarker(item, index)}
            className="listMarkers">
            <div className={classes.pinMarker} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
    }),
    null
  )
)(DocumentoMarker);
