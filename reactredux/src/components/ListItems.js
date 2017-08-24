import React from 'react';

class ListItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }
  renderButtons(id) {

    if (this.state.isEditing){
      return (
        <span>
          <button onClick={()=>this.setState({isEditing:false})}>submit</button>
          <button onClick={()=>this.setState({isEditing:false})}>cancel</button>
        </span>
        )

    }
    return (
      <span>
        <button onClick={()=>this.setState({isEditing:true})}>edit</button>
        <button onClick={() => this.props.removeTodo(id)}>remove</button>
      </span>
)


  }

  render() {
    const {todos} = this.props;
    console.log('todos', todos)
    return (
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <div>
                {this.state.isEditing ? <input type='input' initialValue={todo.text} /> : todo.text}
                {this.renderButtons(todo.id)}
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
