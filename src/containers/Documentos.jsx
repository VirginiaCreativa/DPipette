import React, { Component } from 'react';

import Header from '../components/UI/HeaderMain/HeaderMain';

class Documentos extends Component {
  render() {
    return (
      <>
        <Header
          title="Documentos"
          iconName="icon-book-outline"
          colored="#1fd1a1"
          linked="/documento"
        />
      </>
    );
  }
}

export default Documentos;
