import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
//import rootReducer from './redux/reducers/rootReducer';
import {Provider} from 'react-redux';
import TodoApp from './components/TodoApp';
//import registerServiceWorker from './registerServiceWorker';
//import {addTodo,removeTodo,editTodo,toggleTodo,filterTodo} from './redux/actions/actions'
//import {addTodo} from './redux/actions/actions';

const store = createStore(rootReducer);



/*
//console.log(rootReducer(st,test));
store.dispatch(addTodo("test"))
store.dispatch(addTodo("test2"))
console.log(store.getState());
store.dispatch(editTodo(2, "new test"))
//store.dispatch(toggleTodo(1));
store.dispatch(filterTodo("SHOW_TODO"));
console.log(store.getState());*/

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>
    , document.getElementById('root')
)


//registerServiceWorker();
