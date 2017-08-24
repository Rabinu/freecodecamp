import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {rootReducer} from './redux/reducers/rootReducer';
import {Provider} from 'react-redux';
import TodoContainer from './containers/todos';
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
store.dispatch(filterTodo("SHOW_TODO"))*/


ReactDOM.render(
  <Provider store={store}>
    <div>
    <TodoContainer />
    <button onClick={()=>console.log(store.getState())}> test </button>
    </div>
</Provider>
    , document.getElementById('root')
)


//registerServiceWorker();
