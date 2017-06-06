import {GRID_LENGTH, GRID_WIDTH, NONE, VACANT} from './constants'


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
        facing: NONE,
        color: 0x66dd66,
        currentHeight: 0.1,
        name: '',
        targetHeight: 0.1
      }
    }
  }
  return grid;
}
