import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
//import $ from 'jquery';


let boardWidth = 20;
let boardHeight = 20;


function async (fn) {
    setTimeout(fn, 10);
}

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board:[],
      generation: 0,
      sim:false,
      timerID:'',
      add:false
    };

  }
  componentWillMount(){
    if (this.state.generation === 0){
    this.genRandom()
  }
  }

  clearBoard() {
    this.state.board = [];
    this.pause();
    let height = this.props.height;
    let width = this.props.width;

    for (var i = 0; i < height; i++) {
      let tempArr = []
      for (var ii = 1; ii <= width; ii++) {
        tempArr.push("cell-dead");

      }
      this.state.board.push(tempArr);
    }
    this.setState({generation:1,
    board: this.state.board});


  }

mapArray() {
  const this_ = this;
  let board = this.state.board;
    return (board.map(function(input, irow) {
        return (
            <div className="row" key={`cell-${irow}`}>{input.map(function(array, icol) {

                    return (
                        <div className={`column ${board[irow][icol]}`} onClick={this_.onSubmit.bind(this)} id={`cell-${irow}-${icol}`} key={`cell-${irow}-${icol}`}></div>
                    );
                })}
            </div>
        )
    }))
}

analyseCell() {
let board = this.state.board;
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
    this.state.generation++;
    this.setState({generation:this.state.generation,
    board: board});
    // Wat was hier ook alweer de functie van?
    /*
  async(function(){  board.map(function(input, irow) {
        input.map(function(array, icol) {
            if (board[irow][icol] === "cell-dying"){
              board[irow][icol] = "cell-dead"
            }else if (board[irow][icol] === "cell-born") {
              board[irow][icol] = "cell-alive"
            }


        })
    })
  })*/

}
intervalFunc(){
  if (this.state.sim === false){
  let this_ = this
  this.state.sim = true;
  this.state.timerID = setInterval(function(){
    this_.analyseCell();
  }, 1000);
}
}

genRandom(){

  const height = this.props.height;
  const width = this.props.width;
  const status = ["cell-dead", "cell-alive"];
  this.state.board = [];
  for (var i = 0; i < height; i++) {
    let tempArr = []
    for (var ii = 1; ii <= width; ii++) {
      tempArr.push(status[Math.floor((Math.random() * 2) )]);

    }
    this.state.board.push(tempArr);
  }
  this.setState({generation:1, board:this.state.board},()=>console.log(this.state));
this.intervalFunc();

}

pause(){
  this.state.sim = false;
clearInterval(this.state.timerID);
}

onSubmit(e){
  e.preventDefault();
  const {id} = e.target

  let idCol = parseInt(id.split('-')[2], 10);
  let idRow = parseInt(id.split('-')[1], 10);//parseInt(this.id.slice(5, this.id.length),10);
    //console.log(`.cell-${idRow}-${idCol+1}`);
    console.log(idCol,idRow);
    /*
    board[idRow][idCol]="cell-alive";

    board.map(function(input, id1) {

    input.map(function(array, id2){

    if (array === "cell-alive"){
      $(`#cell-${id1}-${id2}`).removeClass('cell-dead');
      $(`#cell-${id1}-${id2}`).addClass('cell-alive');

    }
  })
  })


*/
}



render() {



    return (
      <div className='container'>
        <div className="gridContainer">
            {this.mapArray()}
          </div>
            <button type='button' onClick={this.genRandom.bind(this)}>Generate Random Board</button>
            <button type='button' onClick={this.pause.bind(this)}>Pause</button>
            <button type="button" onClick={this.intervalFunc.bind(this)}>Run</button>
            <button type='button' onClick={this.clearBoard.bind(this)}>Clear</button>
            <div>Generation {this.state.generation}</div>
            <div></div>
        </div>
    );
}
}

ReactDOM.render(
  <CreateBoard height={boardHeight} width={boardWidth} />, document.getElementById('root')
)
/*
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
*/


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
        hasValue = matrix[cell[0]][cell[1]] !== undefined;
        value = hasValue ? matrix[cell[0]][cell[1]] : NO_VALUE;
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
