import React, { Component } from 'react';

import Header from '../components/UI/HeaderMain/HeaderMain';
import SignificadosMain from '../components/Significados/SignificadosMain/SignificadosMain';

class Significados extends Component {
  render() {
    return (
      <>
        <Header
          title="Significados"
          iconName="icon-funnel-outline"
          colored="#ff6b6b"
          linked="/significadocreate"
        />
        <SignificadosMain />
      </>
    );
  }
}

export default Significados;
