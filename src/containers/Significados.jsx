import React, { Component } from 'react';
import { history } from '../redux/store/Store';

import Header from '../components/UI/HeaderMain_Significados/HeaderMain_Significados';
import SignificadosMain from '../components/Significados/SignificadosMain/SignificadosMain';

class Significados extends Component {
  handleNewIDSignificado = ev => {
    ev.preventDefault();
    history.push('significadocreate');
  };

  render() {
    return (
      <>
        <Header
          title="Significados"
          iconName="icon-funnel-outline"
          colored="#ff6b6b"
          onClick={this.handleNewIDSignificado}
        />
        <SignificadosMain />
      </>
    );
  }
}

export default Significados;
