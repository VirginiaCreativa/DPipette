import React, { Component } from 'react';
import Page from './DocumentoPage/DocumentoPage';
import Marker from './DocumentoMarke/DocumentoMarke';

class Documento extends Component {
  render() {
    return (
      <div>
        <Marker />
        <Page />
      </div>
    );
  }
}

export default Documento;
