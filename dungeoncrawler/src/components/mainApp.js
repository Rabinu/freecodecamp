import React from 'react';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleField: []
    }

  }

  componentDidMount() {

    this.genField();
    document.addEventListener("keydown", this.test.bind(this));
  }
  genField() {
    const {playerState, gameboard} = this.props.state;
    const height = gameboard.height;
    const width = gameboard.width;
    const playerX = playerState.location[0];
    const playerY = playerState.location[1];
    let visibleField = [];
    for (let i = 1; i <= height; i++) {
      let row = []
      for (let ii = 1; ii <= width; ii++) {
        if (i === playerY && ii === playerX) {
          row.push("player");
        } else {
          row.push("empty");
        }
      }
      visibleField.push(row)
    }
    this.setState({visibleField})

  }

  renderField() {
    return this.state.visibleField.map((item) => {
      return (
        <div className="row">
          {item.map((col) => {
            if (col === "player") {
              return (<div className="col player"/>)
            }
            return (<div className="col "/>)
          })}
        </div>
      )
    })
  }

  test(e){
    let player = this.state.player;
    switch (e.keyCode){
      case 87:
      case 38:
        this.props.movePlayer(0,-1);
        break;
      case 83:
      case 40:
        this.props.movePlayer(0,1);
        break;
      case 65:
      case 37:
        this.props.movePlayer(-1,0);
        break;
      case 68:
      case 39:
        this.props.movePlayer(1,0);
        break;
      default:
        console.log("default", player);
    }
    this.genField();

  }

  render() {

    return (
      <div>
        {this.renderField()}
      </div>
    )
  }

}

export default MainApp;
/*
const board = []

const elementsBoard = {
  cellType: ['wall,empty,item,player,enemy'],
  //
  name: '',
  stats: '',
  health: '',
  attack: ''
}*/
