import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function async (fn) {
    setTimeout(fn, 1);
}

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board:[],
      generation: 0,
      sim:false,
      timerID:'',
      add:false,
      boardHeight: 40,
      boardWidth: 40,
      boardSpeed: 200,
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
    let height = this.state.boardHeight;
    let width = this.state.boardWidth;

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
                        <div className={`column ${board[irow][icol]}`} onClick={this_.onSubmit.bind(this_)} id={`cell-${irow}-${icol}`} key={`cell-${irow}-${icol}`}></div>
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
            calcSur(irow, icol, board, (output) => count = output)
            board[irow][icol] = count;
        })
    })

// shows dying and born cells
// remove de async function to remove dying and born cells
async(function() {
    board.map(function(input, irow) {
        input.map(function(array, icol) {
            if (board[irow][icol] === "cell-dying") {
                board[irow][icol] = "cell-dead"
            } else if (board[irow][icol] === "cell-born") {
                board[irow][icol] = "cell-alive"
            }
        })
    })
})

  this.state.generation++;
  this.setState({generation:this.state.generation,
  board: board});

}
// set the speed of the function
intervalFunc(){
  if (this.state.sim === false){
  let this_ = this
  this.state.sim = true;
  this.state.timerID = setInterval(function(){
    this_.analyseCell();
  }, this.state.boardSpeed);
}
}

changespeed(e){

  let newSpeed = parseInt(e.target.id[6], 10)*50;
  if (this.state.sim === true){
  this.setState({boardSpeed: newSpeed},()=>{this.pause(),
    this.intervalFunc()});}
    else{
      this.setState({boardSpeed: newSpeed});
    }
}

genRandom(){

  const height = this.state.boardHeight;
  const width = this.state.boardWidth;
  const status = ["cell-dead", "cell-alive"];
  this.state.board = [];
  for (var i = 0; i < height; i++) {
    let tempArr = []
    for (var ii = 1; ii <= width; ii++) {
      tempArr.push(status[Math.floor((Math.random() * 2) )]);

    }
    this.state.board.push(tempArr);
  }
  this.setState({generation:1, board:this.state.board});
  //this.intervalFunc(); //auto start sim

}

pause(){
  this.state.sim = false;
clearInterval(this.state.timerID);
}



onSubmit(e){
  e.preventDefault();
  const {id} = e.target

  let idRow = parseInt(id.split('-')[1], 10);
  let idCol = parseInt(id.split('-')[2], 10);

  if (this.state.board[idRow][idCol] === "cell-alive"){
    this.state.board[idRow][idCol] = "cell-dead"
  }else if (this.state.board[idRow][idCol] === "cell-dead") {
    this.state.board[idRow][idCol] = "cell-alive"
  }
  this.setState({board:this.state.board});

}

changeBoardSize(e){

  let newSize = parseInt(e.target.id[5], 10)*40;/*
  if (this.state.sim === true){
  this.setState({board: newSize}, ()=>  {this.pause(),
    this.intervalFunc()});}
    else{
      this.setState({boardSpeed: newSpeed});
    }
    */
    if (newSize === 40){
        this.setState({boardHeight: newSize,
        boardWidth: newSize}, ()=>  this.clearBoard());
}
    else{
      this.setState({boardHeight: Math.floor(newSize*9/16),
      boardWidth: newSize}, ()=>  this.clearBoard());


    }


}


render() {



return (

    <div className="gridContainer">
      <div className='setting-buttons-group'>
        <div className="dropdown">

        <button type='button' className='setting-buttons' id='setting-size' >Board size</button>
          <div id="setting-size-dd" className="dropdown-content">
            <ul>
            <li id="size-1" onClick={this.changeBoardSize.bind(this)}>Small</li>
            <li id="size-2" onClick={this.changeBoardSize.bind(this)}>Medium</li>
            <li id="size-3" onClick={this.changeBoardSize.bind(this)}>Big</li>
            </ul>
          </div>
            </div>
            <div className="dropdown">
        <button type='button' className='setting-buttons' id='setting-speed'>Speed</button>

        <div className="dropdown-content">
      <ul>
        <li id="speed-8" onClick={this.changespeed.bind(this)}>Slow</li>
        <li id="speed-4" onClick={this.changespeed.bind(this)}>Normal</li>
        <li id="speed-1" onClick={this.changespeed.bind(this)}>Fast</li>
      </ul>
    </div>
  </div>

      </div>

      <div className='generation-counter'>Generation: {this.state.generation}</div>
      <div className='board-container'>
        {this.mapArray()}
      </div>
      <div className="button-group">
        <button type='button' className='control-buttons' onClick={this.genRandom.bind(this)}>Generate Random Board</button>
        <button type='button' className='control-buttons' onClick={this.pause.bind(this)}>Pause</button>
        <button type="button" className='control-buttons' onClick={this.intervalFunc.bind(this)}>Run</button>
        <button type='button' className='control-buttons' onClick={this.clearBoard.bind(this)}>Clear</button>

      </div>
      <div className="add-text">Blue cells are newborn cells<br/>
      Green cells are old cells<br />
    Red cells are dying cells<br />
  <br />
  You can edit the board by clicking on the cells<br />

  </div>
    </div>

  )
}
}


ReactDOM.render(
  <CreateBoard />, document.getElementById('root')
)

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
