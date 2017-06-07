// @flow
import {
  INCREASE_BUILDING_TARGET_HEIGHT,
  PROGRESS_TIME,
  PLACE_BUILDING,
  PLACE_STREET,
  UPDATE_EVENT_STATUS} from './sceneActions'
import {initializeCityGrid} from './cityGrid';
import {GRID_WIDTH, GRID_LENGTH, BUILDING, STREET, VACANT} from './constants'
const initialState = {
  ticks: 0,
  nextEventAt: 40,
  city: initializeCityGrid(),
  camera : {
    rotation: {x : -55 * Math.PI / 180, y: 0, z:0},
    position: {x: 0, y:10, z:10}
  }
}

function sceneReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EVENT_STATUS:
      return Object.assign({}, state, {nextEventAt: state.ticks + action.payload});

    case PROGRESS_TIME:
      return Object.assign({}, state, {ticks: state.ticks + action.payload, city: growBuildings(state.city, state.ticks)});

    case INCREASE_BUILDING_TARGET_HEIGHT:
      return Object.assign({}, state, {city: increaseBuildingTargetHeight(action.payload, state.city)});

    case PLACE_BUILDING:
      return Object.assign({}, state, {city: placeBuilding(action.payload, state.city)});

    case PLACE_STREET:
      return Object.assign({}, state, {city: placeStreet(action.payload, state.city)});
    default:
      return state;
  }
}

function cloneCity(city: {grid: Array<Array>}) {
  let newGrid = [];
  for (var i = 0; i < city.grid.length; i++) {
    let newRow = [];
    for (var j = 0; j < city.grid[i].length; j++) {
      newRow.push(Object.assign({}, city.grid[i][j]))
    }
    newGrid.push(newRow);
  }
  return Object.assign({}, city, {grid: newGrid});
}

function placeBuilding(
  payload: {
    x: number,
    y: number,
    color: number,
    name: string,
    connectedLots: Array,
    facing: Object

  },
  city: {
    grid: Array<Array>
  }) {
    let newCity = cloneCity(city);
    for (var i = 0; i < payload.connectedLots.length; i++) {
      newCity.grid[payload.connectedLots[i].x][payload.connectedLots[i].y] = Object.assign(
        {},
        city.grid[payload.connectedLots[i].x][payload.connectedLots[i].y],
        {
          lotType: BUILDING,
          color: payload.color,
          name: payload.name,
          connectedLots: payload.connectedLots,
          targetHeight: 1
        }
      );
    }
    return newCity;
}

function placeStreet(
  payload: {
    x: number,
    y: number,
    facing: Object
  },
  city: {
    grid: Array<Array>
  }) {
  let newCity = cloneCity(city);
  let x = payload.x;
  let y = payload.y;
  newCity.grid[x][y] = Object.assign({}, city.grid[x][y], {
    lotType: STREET,
    facing: payload.facing
  });
  return newCity;
}

function increaseBuildingTargetHeight(payload: {x: number, y: number}, city: {grid: Array<Array>}) {
  let newCity = cloneCity(city);
  let x = payload.x;
  let y = payload.y;
  var connectedLots = newCity.grid[x][y].connectedLots;
  for (var i = 0; i < connectedLots.length; i++) {
    newCity.grid[connectedLots[i].x][connectedLots[i].y].targetHeight =
      city.grid[connectedLots[i].x][connectedLots[i].y].targetHeight + 1;
  }
  return newCity;
}

function growBuildings(city: {grid: Array<Array>}, ticks: number) {
  let newCity = cloneCity(city);
  for (var x = 0; x < newCity.grid.length; x++) {
    for (var y = 0; y < newCity.grid[x].length; y++) {
      let lot = newCity.grid[x][y];
      let originalLot = city.grid[x][y];
      if (lot.lotType === BUILDING) {
        let floorDiff = lot.targetHeight - parseInt(lot.currentHeight, 10);
        if (floorDiff > 0) {
          lot.currentHeight = lot.currentHeight + (floorDiff / 10.0);
          if (lot.currentHeight > lot.targetHeight) {
            lot.currentHeight = lot.targetHeight;
          }
        }
      } else if (originalLot.lotType === STREET) {
        let leftPos = {x: x + lot.facing.left.x, y: y + lot.facing.left.y};
        let rightPos = {x: x + lot.facing.right.x, y: y + lot.facing.right.y};

        if (leftPos.x >= 0 &&
            leftPos.x < GRID_WIDTH &&
            leftPos.y >= 0 &&
            leftPos.y < GRID_LENGTH &&
            newCity.grid[leftPos.x][leftPos.y].lotType === VACANT &&
            !hasPossibleParallelStreets(leftPos.x, leftPos.y, newCity.grid)) {
          newCity.grid[leftPos.x][leftPos.y].lotType = STREET;
          newCity.grid[leftPos.x][leftPos.y].facing = lot.facing;
        }
        if (rightPos.x >= 0 &&
            rightPos.x < GRID_WIDTH &&
            rightPos.y >= 0 &&
            rightPos.y < GRID_LENGTH &&
            newCity.grid[rightPos.x][rightPos.y].lotType === VACANT &&
            !hasPossibleParallelStreets(rightPos.x, rightPos.y, newCity.grid)) {
          newCity.grid[rightPos.x][rightPos.y].lotType = STREET;
          newCity.grid[rightPos.x][rightPos.y].facing = lot.facing;
        }
      }
    }
  }
  return newCity;
}

function hasPossibleParallelStreets(x: number, y: number, grid: Array<Array>) {
  let lot = grid[x][y];
  let front = {x: x + lot.facing.direction.x, y: y + lot.facing.direction.y};
  let back = {x: x + lot.facing.opposite.x, y: y + lot.facing.opposite.y};

  return ((grid[front.x][front.y].lotType === STREET &&
    (grid[front.x + lot.facing.left.x][front.y + lot.facing.left.y].lotType === STREET ||
      grid[front.x + lot.facing.right.x][front.y + lot.facing.right.y].lotType === STREET)) ||

      (grid[back.x][back.y].lotType === STREET &&
        (grid[back.x + lot.facing.left.x][back.y + lot.facing.left.y].lotType === STREET ||
          grid[back.x + lot.facing.right.x][back.y + lot.facing.right.y].lotType === STREET)));
}

function growStreets(city: {grid: Array<Array>}) {
  let newCity = cloneCity(city);
  for (var x = 0; x < newCity.grid.length; x++) {
    for (var y = 0; y < newCity.grid[x].length; y++) {
      let lot = city.grid[x][y];
      if (lot.lotType === STREET) {
        let leftPos = {x: x + lot.facing.left.x, y: y + lot.facing.left.y};
        let rightPos = {x: x + lot.facing.right.x, y: y + lot.facing.right.y};
        if (leftPos.x >= 0 &&
            leftPos.x < GRID_WIDTH &&
            leftPos.y >= 0 &&
            leftPos.y < GRID_LENGTH &&
            newCity.grid[leftPos.x][leftPos.y].lotType === VACANT) {
          newCity.grid[leftPos.x][leftPos.y].lotType = STREET;
          newCity.grid[leftPos.x][leftPos.y].facing = lot.facing;
        }
        if (rightPos.x >= 0 &&
            rightPos.x < GRID_WIDTH &&
            rightPos.y >= 0 &&
            rightPos.y < GRID_LENGTH &&
            newCity.grid[rightPos.x][rightPos.y].lotType === VACANT) {
          newCity.grid[rightPos.x][rightPos.y].lotType = STREET;
          newCity.grid[rightPos.x][rightPos.y].facing = lot.facing;
        }
      }
    }
  }
  return newCity;
}

export default sceneReducer;
