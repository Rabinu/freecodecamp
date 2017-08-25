import React from 'react';

class ListItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input:'',
      isEditing: false
    }
  }
  renderButtons(id, text) {

    if (this.state.isEditing){
      return (
        <span>
          <button onClick={()=>this.handleSubmit(id)}>submit</button>
          <button onClick={()=>this.setState({isEditing:false})}>cancel</button>
        </span>
        )

    }
    return (
      <span>
        <button onClick={()=>this.setState({
            isEditing:true,
            input:text
          })}>
          edit
        </button>
        <button onClick={() => this.props.removeTodo(id)}>remove</button>
      </span>
)


  }

  renderText(todo){
        if (this.state.isEditing){

      return (
        <input value={this.state.input} onChange={this.handleChange.bind(this)}/>
      )
    }
    return (
      <span style={todo.completed ? {color:'green'}:{color:'red'}} onClick={()=> this.props.toggleTodo(todo.id)}>{todo.text}</span>
    )

  }


  handleChange(e){
    this.setState({input:e.target.value})
  }

  handleSubmit(id){
    this.props.editTodo(id, this.state.input);
      this.setState({
      input:'',
      isEditing:false
    });
  }

  render() {
    const {todos} = this.props;
    return (
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <div>
                {this.renderText(todo)}
                {this.renderButtons(todo.id, todo.text)}
              </div>

            </li>
          )
        })
}
      </ul>
    )
  }
}

export default ListItems;
