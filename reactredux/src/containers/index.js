import App from '../components/App';
import {connect} from 'react-redux';
import {addTodo, removeTodo, editTodo, toggleTodo} from '../actions'

const mapStateToProps = (state) => {
  return {todos:state}
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    submitNewTodo: todo => dispatch(addTodo(todo))
  }
}*/

const AppContainer = connect(mapStateToProps, {addTodo, removeTodo, editTodo, toggleTodo})(App);

export default AppContainer;
