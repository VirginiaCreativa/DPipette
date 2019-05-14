import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoMarker.module.scss';

class DocumentoMarker extends Component {
  handleDeleteMarker = index => {
    const { documentos, ID, firestore } = this.props;
    const timeDB = documentos[ID].addTimeline;
    firestore.update(`documentos/${ID}`, {
      addTimeline: timeDB.filter(remove => remove !== index),
    });
  };

  render() {
    const { markers, onRef, documentos, ID } = this.props;

    return (
      <div className={classes.DocumentoMarker}>
        <ul className="list-unstyled">
          {markers.map((item, index) => (
            <li key={index} style={{ top: `${item.height}px` }} ref={onRef}>
              <div className={classes.pinMarker} />
              <div
                className={classes.btnDelete}
                role="presentation"
                onClick={() => this.handleDeleteMarker(item, index)}>
                <i className="bx bx-trash-alt" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
    }),
    null
  )
)(DocumentoMarker);
