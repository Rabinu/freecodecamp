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

function async (fn) {
    setTimeout(fn, 1000);
}

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
    };

  }

  fillDeadArray() {
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

  mapArray(e) {
    return (
      board.map(function(input, irow) {
        return (
          <div className="row" key={`cell-${irow}`}>{
      input.map(function(array, icol){
        if(e !== Number){
        return (<div className="column cell-dead" id={`cell-${irow}-${icol}`} key={`cell-${irow}-${icol}`}></div>);
}
return (<div className={`column board[irow][icol]`} id={`cell-${irow}-${icol}`} key={`cell-${irow}-${icol}`}>{e}</div>);
      })}
          </div>
        )
      })
    )
  }

  analyseCell() {

      board.map(function(input, irow) {

      input.map(function(array, icol){
        let count;
        calcSur(irow,icol,board,(output)=>count=output)
        document.getElementById(`cell-${irow}-${icol}`).innerHTML = count;
      })


      })


  }


  render() {
this.fillDeadArray()
    return (
      <div className="container">
{this.mapArray()}

<button type="button" onClick={this.analyseCell.bind(this)}>test</button>
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
  //console.log(`.cell-${idRow}-${idCol+1}`);
  //console.log(this.id);
  board[idRow][idCol]="cell-alive";

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

function calcSur(row,column,matrix,callback){
  const rowLength = matrix[0].length;
  const colLength = matrix.length;
  const rowUp = row-1;
  const rowDown = row+1;
  const columnLeft = column-1;
  const columnRight = column+1;
  const status = matrix[row][column];
  const fullCheck = [[rowUp,columnLeft],[rowUp,column],[rowUp,columnRight],[row,columnLeft],[row,columnRight],[rowDown,columnLeft],[rowDown,column],[rowDown,columnRight]];
  let countAlive = 0;

  //status !== "cell-dead" ? countAlive++: null;

    //chech status of surrounding cells
  fullCheck.map(function(cell) {
    const NO_VALUE = "cell-dead";
    let value, hasValue;
    try {
        hasValue = board[cell[0]][cell[1]] !== undefined;
        value = hasValue ? board[cell[0]][cell[1]] : NO_VALUE;
    } catch (e) {
        value = NO_VALUE;
    }
    value === "cell-alive" ? countAlive++ : null;


  })

  callback(countAlive);
}
