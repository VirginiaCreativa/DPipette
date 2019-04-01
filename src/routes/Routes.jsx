import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Significados from '../containers/Significados';
import SignificadosCreate from '../components/Significados/SignificadosCreate/SignificadosCreate';
import SignificadoDetail from '../components/Significados/SignificadosDetail/SignificadoDetail';
import NotesCornell from '../containers/NotesCornell';
import NoteCornell from '../components/NotesCornell/NoteCornell/NoteCornell';
import Documentos from '../containers/Documentos';
import Foros from '../containers/Foros';
import NotFound from '../containers/NotFound';

const Routers = () => (
  <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/foros" component={Foros} />
      <Route path="/significados" component={Significados} />
      <Route path="/significadocreate" component={SignificadosCreate} />
      <Route path="/significado/:id" component={SignificadoDetail} />
      <Route path="/notescornell" component={NotesCornell} />
      <Route path="/notecornell/:id" component={NoteCornell} />
      <Route path="/documentos" component={Documentos} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default Routers;
