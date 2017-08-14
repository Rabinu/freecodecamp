export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const FILTER_TODO = "FILTER_TODO"
export const FILTER_SHOW_ALL = 'FILTER_SHOW_ALL';
export const FILTER_SHOW_COMPLETED = 'FILTER_SHOW_COMPLETED';
export const FILTER_SHOW_TODO = 'FILTER_SHOW_TODO';

export const addTodo = text => {
  return {type: ADD_TODO, text}
}

export const editTodo = (id, text) => {
  return {type: EDIT_TODO, id, text}
}
export const toggleTodo = id => {
  return {type: TOGGLE_TODO, id}
}

export const removeTodo = id => {
  return {type: REMOVE_TODO, id}
}

export const filterTodo = (filter) => {
  return {type: FILTER_TODO, filter}
}
