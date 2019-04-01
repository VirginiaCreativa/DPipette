import React from 'react';
import { Router } from 'react-router-dom';
import { history } from './redux/store/Store';
import Routes from './routes/Routes';
import Layout from './hoc/Layout/Layout';

const App = () => (
  <>
    <Router history={history}>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  </>
);

export default App;
