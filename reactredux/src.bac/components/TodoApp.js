
import React from 'react';
import TodoList from './todolist'


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({input:e.target.value})
    }

  handleSubmit(){
    this.props.submitNewTodo(this.state.input);
    this.setState({input:''});

  }

  render() {

    return (
      <div>
        <input value={this.state.input} onChange={this.handleChange.bind(this)}/>
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        <ul>
        {this.props.todos.map(todo=><TodoList {...todo} />)}
      </ul>
        <button>Show all</button>
      </div>
    )
  }

}



export default TodoApp;
