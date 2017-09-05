import {MOVE_PLAYER, INIT} from '../constants'


export const movePlayer = (x, y) => {
  return {
    type: MOVE_PLAYER,
    direction: [x,y]
  }
}
