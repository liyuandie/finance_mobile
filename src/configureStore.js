import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(reducer, applyMiddleware(...middlewares));

  return store;
};
