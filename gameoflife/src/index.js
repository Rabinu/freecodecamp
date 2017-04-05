import React from 'react';
import ReactDOM from 'react-dom';
//import {Grid, Row, Col, Clearfix, Button} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import $ from 'jquery';

let board = [];
let boardWidth = 7;
let boardHeight = 5;
//let generation = 1;
let cellCount = 0;



class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 50,
    };

  }

  drawBoard() {
    let height = this.props.height;
    let width = this.props.width;

    for (var i = 0; i < height; i++) {
      let tempArr = []
      for (var ii = 1; ii <= width; ii++) {
        tempArr.push("cell-dead");

      }
      board.push(tempArr);
    }

  }

  drawBoard2() {
    this.drawBoard();
    return (
      board.map(function(input, irow) {
        return (
          <div className="row" key={`cell-${irow}`}>{
      input.map(function(array, icol){

        return (<div className="column" id={`cell-${irow}-${icol}`} key={`cell-${irow}-${icol}`}>{array}</div>);
      })}
          </div>
        )
      })
    )
  }

  render() {

    return (
      <div className="container">

       {this.drawBoard2()}
</div>
    );
  }
}

ReactDOM.render(
  <CreateBoard height={boardHeight} width={boardWidth} />, document.getElementById('root')
)


$('.column').click(function(){
  let idCol = parseInt(this.id.split('-')[2], 10);
  let idRow = parseInt(this.id.split('-')[1], 10);//parseInt(this.id.slice(5, this.id.length),10);
  console.log(`.cell-${idRow}-${idCol+1}`);
  console.log(this.id);
  board[idRow][idCol]="cell-alive";
  console.log(board[idRow][idCol]);
  board.map(function(input, id1) {

  input.map(function(array, id2){

  if (array == "cell-alive"){
    $(`#cell-${id1}-${id2}`).addClass('cell-alive');
  }
})
})
  //$( this ).toggleClass('cell-select')
  //$(`#cell-${idRow}-${idCol+1}`).toggleClass('cell-close')
  //$(`#cell-${idRow}-${idCol+1}`).toggleClass('cell-close')
})

function calcSur(index){

}
