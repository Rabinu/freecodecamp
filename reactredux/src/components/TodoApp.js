
import React from 'react';
import {connect} from 'react-redux';

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
    console.log(e.target.value);
  }

  handleSubmit(){

    this.setState({input:''});
  }

  render() {
    return (
      <div>
        <input value={this.state.input} onChange={this.handleChange.bind(this)}/>
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        <ul>
          <li>list item 1 <button>edit</button><button>remove</button></li>
          <li>list item 2</li>
        </ul>
        <button>Show all</button>
      </div>
    )
  }

}



export default TodoApp;
