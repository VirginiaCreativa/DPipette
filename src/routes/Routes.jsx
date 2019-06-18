import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Significados from '../containers/Significados';
import SignificadosCreate from '../components/Significados/SignificadosCreate/SignificadosCreate';
import SignificadoDetail from '../components/Significados/SignificadosDetail/SignificadoDetail';
import NotesCornell from '../containers/NotesCornell';
import NoteCornell from '../components/NotesCornell/NoteCornell/NoteCornell';
import Documentos from '../containers/Documentos';
import Documento from '../components/Documentos/Documento/Documento';
import Foros from '../containers/Foros';
import NotFound from '../containers/NotFound';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Perfil from '../containers/Perfil';

const Routers = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/foros" component={Foros} />
      <Route exact path="/significados" component={Significados} />
      <Route exact path="/significadocreate" component={SignificadosCreate} />
      <Route exact path="/significado/:id" component={SignificadoDetail} />
      <Route exact path="/notescornell" component={NotesCornell} />
      <Route exact path="/notecornell/:id" component={NoteCornell} />
      <Route exact path="/documentos" component={Documentos} />
      <Route exact path="/documento/:id" component={Documento} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/perfil" component={Perfil} />
      <Route exact component={NotFound} />
    </Switch>
  </>
);

export default Routers;
