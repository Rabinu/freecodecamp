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
    this.props.addTodo(this.state.input);
    this.setState({input:''});
  }



  render(){
    return (
      <div className="App">
        <div className="form-inline">
          <div className="form-group">
            <input className="form-control"
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
        </div>

      </div>
    )

  }
}

export default App;
