import {ADD_TODO, EDIT_TODO, TOGGLE_TODO, REMOVE_TODO} from '../constants'

export const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  }
}

export const editTodo = (id, text) => {
  return {
    type: EDIT_TODO,
    id,
    text
  }
}
export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export const removeTodo = id => {
  return {type: REMOVE_TODO,
    id
  }
}
