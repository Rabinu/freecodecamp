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
      size: 50,
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

  mapArray() {
    return (
      board.map(function(input, irow) {
        return (
          <div className="row" key={`cell-${irow}`}>{
      input.map(function(array, icol){

        return (<div className="column cell-dead" id={`cell-${irow}-${icol}`} key={`cell-${irow}-${icol}`}></div>);
      })}
          </div>
        )
      })
    )
  }

  analyseCell() {

      board.map(function(input, irow) {

      input.map(function(array, icol){
        setTimeout(function(){$(`#cell-${irow}-${icol}`).addClass('cell-alive')},1000)
      })


      })


  }


  render() {
this.fillDeadArray()
    return (
      <div className="container">
{this.mapArray()}
{this.analyseCell()}

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
  let idCol = parseInt(index.split('-')[2], 10);
  let idRow = parseInt(index.split('-')[1], 10);

}
