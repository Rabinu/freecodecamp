import React from 'react';
import ListItems from './ListItems';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({input:e.target.value})

  }

  handleSubmit(){
    if (this.state.input !== ''){
    this.props.addTodo(this.state.input);
    this.setState({input:''});
  }
  }



  render(){
    return (
          <div >
            <input
              placeholder="What to do?"
              onChange={this.handleChange.bind(this)}
              value={this.state.input}
              />
            <button
              type="button"
              onClick={this.handleSubmit.bind(this)}
              >
              Add todo
            </button>
            <ListItems {...this.props} />
          </div>
    )

  }
}

export default App;
