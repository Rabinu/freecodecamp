import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from './reducers'
import MainContainer from './containers';
import './main.css';

const store = createStore(rootReducer);

const render = () => ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>
  , document.getElementById('root')
);

render();
//store.subscribe(render);
//store.subscribe(()=>console.log(store.getState()));
