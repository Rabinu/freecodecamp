
import React from 'react';

class TodoList extends React.Component{
  constructor(props){
    super(props);
    this.state = {isEditing:false}
  }

  renderTodo(e){
    if (this.state.isEditing){
      return <input value={e} />
}


    return e
}



  renderButtons(){
    if (this.state.isEditing){
      return <div><button onClick={()=>this.setState({isEditing:false})}>submit</button><button onClick={()=>this.setState({isEditing:false})}>cancel</button></div>

    }
    return <div><button onClick={()=>this.setState({isEditing:true})}>edit</button><button>remove</button></div>

  }
onSubmit(e){
  this.setState({isEditing:false})
  

  //this.props.action(editTodo())
}


  render(){
    return (
      <ul>
        {this.props.todos.map((item) =>
        <li id={item.id}>{this.renderTodo(item.text)} {this.renderButtons()} </li>
        )}
      </ul>

    )
  }
}
export default TodoList;
