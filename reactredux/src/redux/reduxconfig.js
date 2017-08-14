import {createStore} from 'redux'

const store = createStore(rootReducer);

const SHOWALL = "SHOWALL";
const SHOWDONE = "SHOWDONE";
const SHOWTODO = "FILTERTODO";

const initialState = {
  visibility: SHOWALL,
  todo:[]
  }

  function rootReducer(state = initialState, action){
    console.log(state);
    return state;
  }

  const test = (item) => {
    console.log(item)
    return {todo: item}
  }
