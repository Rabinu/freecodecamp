import React from 'react';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleField: [],
      playingfieldboard: [],
      rooms: []
    }

  }

  componentDidMount() {

    this.genPlayingfield();
    document.addEventListener("keydown", this.test.bind(this));
  }

  genPlayingfield() {
    const {playerState, playingfield} = this.props.state;
    const height = playingfield.height;
    const width = playingfield.width;

    let playingfieldboard = [];

    const startroom = this.roomCreator();
    const startroomX = this.generateRandom(0, (width - startroom.width));
    const startroomY = this.generateRandom(0, (height - startroom.height));

    const coordStartroom =     {
          roomNumber:1,
          coordX:[startroomX,startroomX+startroom.width-1],
          coordY:[startroomY,startroomY+startroom.height-1],
        }


    this.placeRooms();


    for (let h = 0; h <= height; h++) {
      let row = [];
      for (let w = 0; w <= width; w++) {
        if (w >= startroomX && w < (startroomX + startroom.width) && h >= startroomY && h < (startroomY + startroom.height)) {
          row.push('room')
        } else {
          row.push('wall')
        }
      }
      playingfieldboard.push(row)
    }

    //this.searchRooms(playingfieldboard)


    this.setState({playingfieldboard});

    //generate outerwall

  }

  searchRooms(field) {
    let tr = [];
    let tl = [];
    let br = [];
    let bl = [];
    let oldBlock = [];
    let newBlock = [];
    let counterX = 0;
    let counterY = 0
    let hallNum = this.generateRandom(1,4);

    field.map((row, rowI) => {
      row.map((col, colI) => {
        if (col === "room") {

          counterX++
          oldBlock = [colI, rowI]
        }
      })
      if (counterX > 0 && counterY === 0 ){
        tr = [oldBlock[0]-(counterX-1),oldBlock[1]];
        tl = oldBlock;
        counterX = 0
        counterY++
      }
      if (counterX > 0){
        counterX = 0;
        br = [tr[0],tr[1]+counterY];
        bl = [tl[0],tl[1]+counterY]
        counterY++
      }
    })



    /*
    this.state.rooms.map((room)=>{
      console.log("test")
      ()=>console.log(this.state)
      room === [tl,tr,bl,br] ? console.log("error") : this.setState({rooms:[...this.state.rooms,[tl,tr,bl,br]]})
    })
    */
  }

  placeRooms(callback) {
    const {playingfield} = this.props.state;
    let currentRoomCount = 0;
    let fieldRooms = [];

    while (currentRoomCount < playingfield.max_rooms) {

      let room = this.roomCreator();
      let roomX = 0;
      let roomY = 0;

      if (fieldRooms.length === 0) {
        roomX = this.generateRandom(0, (playingfield.width - room.width));
        roomY = this.generateRandom(0, (playingfield.height - room.height));
        fieldRooms.push(
          {
          coordX:[roomX,roomX+room.width-1],
          coordY:[roomY,roomY+room.height-1],
          roomNumber: 1,
          halls:[0,this.generateRandom(1,4)]
          }
        )
        currentRoomCount++
      } else {
        let previousRoom = fieldRooms[fieldRooms.length-1]
        if (previousRoom.halls[0] < previousRoom.halls[1]){
          let hallOrder = this.shuffleArray()
          /*switch (hallOrder[i]) {
            case 1:
              [previousRoom.coordX[0],previousRoom.coordX[1]]
            case 2:

            case 3:

            case 4:

          }*/
        }

        roomX = this.generateRandom(0, (playingfield.width - room.width));
        roomY = this.generateRandom(0, (playingfield.height - room.height));

        currentRoomCount++

      }





    }





  /*

    const startroom = this.roomCreator();
    const roomX = this.generateRandom(0, (fieldWidth - startroom.width));
    const roomY = this.generateRandom(0, (fieldHeight - startroom.height));

    this.props.addRoom(startroomX,startroomY,startroom)

    const newRoom = this.roomCreator();
    console.log(this.props.state.playingfield.rooms)
    //this.props.addRoom()
    this.props.state.playingfield.rooms.map(room => {
      console.log("test")
      console.log(room.roomNumber);
    })*/

  //const {coordX, coordY, roomNumber, max_hall} = this.props.state.playingfield.rooms
  //console.log(roomNumber, coordX, coordY, max_hall)

  }

  generateRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  roomCreator() {
    const minSize = 5;
    const maxSize = 15;
    const max_hall = this.generateRandom(1,4);
    //console.log(max_hall)
    const height = this.generateRandom(minSize, maxSize);
    const width = this.generateRandom(minSize, maxSize);
    return {width, height, max_hall};

  }

  /*
  genField() {
    const {playerState, playingfield} = this.props.state;
    const height = playingfield.height;
    const width = playingfield.width;
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

  }*/

  renderField() {

    return this.state.playingfieldboard.map((item) => {
      return (
        <div className="row">
          {item.map((col) => {
            if (col === "room") {
              return (<div className="col room"/>)
            }
            return (<div className="col"/>)
          })}
        </div>
      )
    })
  }

  test(e) {

    /*
    let player = this.state.player;
    switch (e.keyCode) {
      case 87:
      case 38:
        this.props.movePlayer(0, -1);
        break;
      case 83:
      case 40:
        this.props.movePlayer(0, 1);
        break;
      case 65:
      case 37:
        this.props.movePlayer(-1, 0);
        break;
      case 68:
      case 39:
        this.props.movePlayer(1, 0);
        break;
      default:
        this.roomCreator();
    }
    this.genField();
*/
  }


  shuffleArray() {
    let array = [1,2,3,4]
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]]=[array[j], array[i]]
    }
    return array;
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
