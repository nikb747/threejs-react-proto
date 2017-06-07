
import {GRID_LENGTH, GRID_WIDTH, FACING_NONE, BUILDING, VACANT} from './constants'


export const initializeCityGrid = () => {
  return ({
    grid: emptyGrid(GRID_WIDTH, GRID_LENGTH)
  })
}

const emptyGrid = (width, height) => {
  let grid = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = {
        lotType: VACANT,
        connectedLots: [{x,y}],
        facing: FACING_NONE,
        color: 0x659D32,
        currentHeight: 0.1,
        name: '',
        targetHeight: 0.1
      }
    }
  }
  return grid;
}
