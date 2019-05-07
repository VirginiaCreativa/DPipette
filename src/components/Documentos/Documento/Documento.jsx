import React, { Component } from 'react';
import Page from './DocumentoPage/DocumentoPage';
import Marker from './DocumentoMarker/DocumentoMarker';
import Video from './DocumentoVideo/DocumentoVideo';
import classes from './Documento.module.scss';

class Documento extends Component {
  render() {
    return (
      <div className={classes.Documento}>
        <div className={classes.formAddMarker}>
          <div className="row justify-content-start">
            <input
              type="text"
              name="time"
              ref={ref => (this.refInputValue = ref)}
              onChange={this.handleChangeValueTimeline}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleAddTimeline}>
              Crear un marcador
            </button>
          </div>
        </div>
        <div className={classes.Wrapper}>
          <Marker />
          <Page />
          <Video />
        </div>
      </div>
    );
  }
}

export default Documento;
