import {
  ADD_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  FILTER_TODO,
  FILTER_SHOW_ALL,
  FILTER_SHOW_TODO,
  FILTER_SHOW_COMPLETED
} from '../actions/actions'
import {combineReducers} from 'redux';

export const todoReducer = (state = [], action) => {

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
export const filterReducer = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case FILTER_TODO:
      return action.filter
    default:
      return state;

  }
}

export const rootReducer = combineReducers({
  todo: todoReducer,
  filter: filterReducer
});
