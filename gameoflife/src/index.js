import React from 'react';
import ReactDOM from 'react-dom';
//import {Grid, Row, Col, Clearfix, Button} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import $ from 'jquery';

let board = [];
let boardWidth = 20;
let boardHeight = 20;
let generation = 0;
//let cellCount = 0;

function async (fn) {
    setTimeout(fn, 10);
}

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generation: 0,
    };

  }
  componentWillMount(){
    if (this.state.generation === 0){
    let height = this.props.height;
    let width = this.props.width;

    for (var i = 0; i < height; i++) {
      let tempArr = []
      for (var ii = 1; ii <= width; ii++) {
        tempArr.push("cell-dead");

      }
      board.push(tempArr);
    }
    this.setState({generation:1});
  }
  console.log(board);
  }

  updateArray() {
    if (this.state.generation === 0){
    let height = this.props.height;
    let width = this.props.width;

    for (var i = 0; i < height; i++) {
      let tempArr = []
      for (var ii = 1; ii <= width; ii++) {
        tempArr.push("cell-dead");

      }
      board.push(tempArr);
    }
    this.setState({generation:1});
  }
  console.log(board);
  }

mapArray(e) {
    return (board.map(function(input, irow) {
        return (
            <div className="row" key={`cell-${irow}`}>{input.map(function(array, icol) {

                    return (
                        <div className={`column ${board[irow][icol]}`} id={`cell-${irow}-${icol}`} key={`cell-${irow}-${icol}`}>{e}</div>
                    );
                })}
            </div>
        )
    }))
}

analyseCell() {
    board.map(function(input, irow) {
        input.map(function(array, icol) {
            let count;
            if (board[irow][icol] === "cell-dying"){
              board[irow][icol] = "cell-dead"
            }else if (board[irow][icol] === "cell-born") {
              board[irow][icol] = "cell-alive"
            }

            calcSur(irow, icol, board, (output) => count = output)
            board[irow][icol] = count;
        })
    })
    this.setState({generation:generation++});
  async(function(){  board.map(function(input, irow) {
        input.map(function(array, icol) {
            if (board[irow][icol] === "cell-dying"){
              board[irow][icol] = "cell-dead"
            }else if (board[irow][icol] === "cell-born") {
              board[irow][icol] = "cell-alive"
            }


        })
    })
  })

}
intervalFunc(){
  let this_ = this
  setInterval(function(){console.log("test");
    this_.analyseCell();
  }, 200);
}


render() {

    return (
      <div className='container'>
        <div className="gridContainer">
            {this.mapArray()}
          </div>
            <button type='button'>Generate Random Board</button>
            <button type='button'>Pauze</button>
            <button type="button" onClick={this.intervalFunc.bind(this)}>Run</button>
            <button type='button'>Clear</button>
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

  if (array === "cell-alive"){
    $(`#cell-${id1}-${id2}`).removeClass('cell-dead');
    $(`#cell-${id1}-${id2}`).addClass('cell-alive');

  }
})
})

  //$( this ).toggleClass('cell-select')
  //$(`#cell-${idRow}-${idCol+1}`).toggleClass('cell-close')
  //$(`#cell-${idRow}-${idCol+1}`).toggleClass('cell-close')
})

function calcSur(row,column,matrix,callback){
  const rowUp = row-1;
  const rowDown = row+1;
  const columnLeft = column-1;
  const columnRight = column+1;
  let status = matrix[row][column]; //status: [cell-born, cell-dead] [cell-dying, cell-alive, cell-old]
  const fullCheck = [[rowUp,columnLeft],[rowUp,column],[rowUp,columnRight],[row,columnLeft],[row,columnRight],[rowDown,columnLeft],[rowDown,column],[rowDown,columnRight]];
  let countAlive = 0;

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
    if (value === "cell-alive" || value === "cell-old" || value === "cell-dying"){
      countAlive++;
    }
  })

  if(status === "cell-alive" || status === "cell-old"){

    if (countAlive === 2 || countAlive === 3){
      callback("cell-old");
    }else{
      callback("cell-dying");
    }
  }else if (status === "cell-dead" ) {
    countAlive === 3 ? callback("cell-born") : callback("cell-dead");
  }

}
