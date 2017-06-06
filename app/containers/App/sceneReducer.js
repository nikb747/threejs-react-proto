// @flow
import {INCREASE_BUILDING_TARGET_HEIGHT, PROGRESS_TIME, PLACE_BUILDING, UPDATE_EVENT_STATUS} from './sceneActions'
import {initializeCityGrid} from './cityGrid';
import {BUILDING} from './constants'
const initialState = {
  ticks: 0,
  nextEventAt: 100,
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
      return Object.assign({}, state, {ticks: state.ticks + action.payload, city: growBuildings(state.city)});

    case INCREASE_BUILDING_TARGET_HEIGHT:
      return Object.assign({}, state, {city: increaseBuildingTargetHeight(action.payload, state.city)});

    case PLACE_BUILDING:
      return Object.assign({}, state, {city: placeBuilding(action.payload, state.city)});

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
    connectedLots: Array
  },
  city: {
    grid: Array<Array>
  }) {
  let newCity = cloneCity(city);
  let x = payload.x;
  let y = payload.y;
  newCity.grid[x][y] = Object.assign({}, city.grid[x][y], {
    lotType: BUILDING,
    color: payload.color,
    name: payload.name,
    connectedLots: payload.connectedLots,
    targetHeight: 1
  });
  return newCity;
}

function increaseBuildingTargetHeight(payload: {x: number, y: number}, city: {grid: Array<Array>}) {
  let newCity = cloneCity(city);
  let x = payload.x;
  let y = payload.y;
  newCity.grid[x][y].targetHeight = city.grid[x][y].targetHeight + 1;
  return newCity;
}

function growBuildings(city: {grid: Array<Array>}) {
  let newCity = cloneCity(city);
  for (var x = 0; x < newCity.grid.length; x++) {
    for (var y = 0; y < newCity.grid[x].length; y++) {
      let lot = newCity.grid[x][y];
      if (lot.lotType === BUILDING) {
        let floorDiff = lot.targetHeight - parseInt(lot.currentHeight, 10);
        if (floorDiff > 0) {
          lot.currentHeight = lot.currentHeight + (floorDiff / 10.0);
          if (lot.currentHeight > lot.targetHeight) {
            lot.currentHeight = lot.targetHeight;
          }
        }
      }
    }
  }
  return newCity;
}

export default sceneReducer;
