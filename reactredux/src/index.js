import React from 'react';
import ReactDom from 'react-dom';
import AppContainer from './containers';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import todoReducer from './reducers';

const store = createStore(todoReducer);

ReactDom.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
