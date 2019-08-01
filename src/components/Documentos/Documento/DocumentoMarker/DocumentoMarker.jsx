import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoMarker.module.scss';

import {
  getTimelineSame,
  getMarkerTouchHeight,
} from '../../../../redux/actions/DocumentosAction';

const DocumentoMarker = ({
  markers,
  onRef,
  ID,
  firestore,
  documentos,
  getTimelineSame,
  viewTakeTimeline,
  onTimelSame,
  addTimeline,
  pageGrid,
  getMarkerTouchHeight,
  markerHeight,
  timelineSame,
}) => {
  const [isTouchPointHeight, setTouchPointHeight] = useState(0);

  useEffect(() => {
    const existeTime = documentos[ID].addTimeline;
    if (existeTime.length >= 1) {
      const sameLastMarke =
        documentos[ID].addTimeline.slice(-1).pop().height + 40;
      getTimelineSame(sameLastMarke);
    }
  }, [ID, documentos, getTimelineSame]);

  const handleDeleteMarker = (index, item) => {
    const timeDB = documentos[ID].addTimeline;
    firestore.update(`documentos/${ID}`, {
      addTimeline: timeDB.filter(remove => remove !== index),
    });
  };

  const pageHeighPoint = ev => {
    const pointClic = ev.pageY - 140;
    setTouchPointHeight(pointClic);
    getMarkerTouchHeight(pointClic);
  };

  const resutlPointHe = isTouchPointHeight || timelineSame;
  const boxStyle = {
    top: `${resutlPointHe}px`,
  };

  return (
    <div
      className={classes.DocumentoMarker}
      role="presentation"
      onClick={pageHeighPoint}>
      {viewTakeTimeline && (
        <div
          className={
            pageGrid
              ? classes.pinMarkerLeftSelect
              : classes.pinMarkerRightSelect
          }
          role="presentation"
          style={boxStyle}
        />
      )}
      <ul className="list-unstyled">
        {addTimeline.map((item, index) => (
          <li key={index} style={{ top: `${item.height}px` }}>
            <div
              className={
                pageGrid ? classes.pinMarkerLeft : classes.pinMarkerRight
              }
              role="presentation"
              onClick={() => onTimelSame(item, index)}
            />
            <span>{index + 1}</span>
            <div
              className={
                pageGrid ? classes.btnDeleteLeft : classes.btnDeleteRight
              }
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
  bindActionCreators({ getTimelineSame, getMarkerTouchHeight }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
      viewTakeTimeline: state.Documentos.viewTakeTimeline,
      timelineSame: state.Documentos.timelineSame,
    }),
    mapDispatchToProps
  )
)(DocumentoMarker);
