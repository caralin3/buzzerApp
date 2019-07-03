import { applyMiddleware, createStore, compose, Store } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import * as session from './session';
import { ApplicationState } from '.';

declare const window: any;

export default (): Store<ApplicationState> => {
  const composeEnhancers = __DEV__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
      composeWithDevTools({ realtime: true })
    : compose;

  const middleware = composeEnhancers(applyMiddleware(thunk));

  const persistConfig = {
    storage: AsyncStorage,
    key: 'primary'
  };

  const rootReducer = persistCombineReducers<ApplicationState>(persistConfig, {
    Session: session.reducer
  });

  return createStore(rootReducer, undefined, middleware);
};
