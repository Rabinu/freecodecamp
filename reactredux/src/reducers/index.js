import {
  ADD_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  FILTER_TODO
} from '../constants';

const todoReducer = (state = [], action) => {

  switch (action.type) {
    case ADD_TODO:
      return [
        ...state, {
          id: state.length === 0
            ? 1
            : state[state.length - 1].id + 1,
          text: action.text,
          completed: false
        }
      ]
    case REMOVE_TODO:
      return state.filter(todo => {
        return todo.id !== action.id
      })

    case EDIT_TODO:
      return state.map((todo) => (todo.id === action.id)
        ? {
          ...todo,
          text: action.text
        }
        : todo)
    case TOGGLE_TODO:
      return state.map(todo => todo.id === action.id
        ? {
          ...todo,
          completed: !todo.completed
        }
        : todo)

    default:
      return state;

  }

}

export default todoReducer;
