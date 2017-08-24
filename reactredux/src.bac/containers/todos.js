import {connect} from 'react-redux';
import TodoApp from '../components/TodoApp'
import {addTodo, editTodo} from '../redux/actions/actions'
//import {todoReducer} from '../redux/reducers/rootReducer'

const mapStateToProps = (state) => {
  return {todos: state.todo}
}

const mapDispatchToProps = (dispatch) => {
    return {
    submitNewTodo: todo => dispatch(addTodo(todo)),
    submitEditTodo: (id, todo) => dispatch(editTodo(id, todo))
  }
}

const TodoContainer =  connect(mapStateToProps,mapDispatchToProps)(TodoApp);

export default TodoContainer;
