import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { getFirebase } from 'react-redux-firebase';
import { logger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers/Reducer';

export const history = createBrowserHistory();

export default function createReduxStore(preloadedState) {
  const enhancers = [];
  const middleware = [
    ReduxThunk.withExtraArgument(getFirebase),
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || logger;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(applyMiddleware(logger, ...middleware));

  const store = createStore(
    rootReducer(history),
    preloadedState,
    composedEnhancers
  );

  if (module.hot) {
    module.hot.accept('../reducers/Reducer', () => {
      const nextRootReducer = require('../reducers/Reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
