import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoMarker.module.scss';

const DocumentoMarker = ({ markers, onRef, ID, firestore, documentos }) => {
  const [isIndexMaker, setIndexMaker] = useState(null);

  const handleDeleteMarker = (index, item) => {
    const arrayPageH = documentos[ID].addPageHeightTime;
    setIndexMaker(index);
    firestore.update(`documentos/${ID}`, {
      addPageHeightTime: arrayPageH.filter(delMakerP => delMakerP !== index),
    });
  };

  useEffect(
    () => () => {
      const arrayTimelines = documentos[ID].addTimeline;
      console.log(isIndexMaker);
      firestore.update(`documentos/${ID}`, {
        addTimeline: arrayTimelines.filter(itemT => {
          console.log('===>', itemT !== isIndexMaker);
          return itemT !== isIndexMaker;
        }),
      });
    },
    [ID, documentos, firestore, isIndexMaker]
  );

  return (
    <div className={classes.DocumentoMarker}>
      <ul className="list-unstyled">
        {markers.map((item, index) => (
          <li key={index} style={{ top: `${item}px` }} ref={onRef}>
            <div className={classes.pinMarker} />
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

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
    }),
    null
  )
)(DocumentoMarker);
