// @flow
import {
  PROGRESS_TIME,
  SWING_DOOR,
  RESET,
  UPDATE_EVENT_STATUS} from './sceneActions';
import {DOOR_COLORS, NUMBER_OF_DOOR_TYPES} from './constants';

const initialState = {
  ticks: 0,
  camera : {
    rotation: {x : -10 * Math.PI / 180, y: 0, z:0},
    position: {x: 0, y:5, z:5}
  },
  currentDoorAngle: 90,
  targetDoorAngle: 0,
  doors: [generateRandomDoor(), generateRandomDoor(), generateRandomDoor(), generateRandomDoor()]
}

function sceneReducer(state = initialState, action) {
  switch (action.type) {
    case PROGRESS_TIME:
      return Object.assign({}, state, {ticks: state.ticks + action.payload});

    case RESET:
      return Object.assign({}, initialState, {doors: [
          generateRandomDoor(),
          generateRandomDoor(),
          generateRandomDoor(),
          generateRandomDoor()]
        });

    case SWING_DOOR:
      return Object.assign({}, state, {currentDoorAngle: updateDoorAngle(state.currentDoorAngle, state.targetDoorAngle)});

    default:
      return state;
  }
}

function updateDoorAngle(currentDoorAngle: number, targetDoorAngle: number) {
  if (Math.abs(targetDoorAngle) === 0) {
    if (currentDoorAngle > targetDoorAngle) {
      return currentDoorAngle - 1;
    }
  }
  return currentDoorAngle;
}



function pickRandomDoorColor() {
  return DOOR_COLORS[parseInt(Math.random() * DOOR_COLORS.length, 10)];
}

function pickRandomPanels() {
  return parseInt(Math.random() * NUMBER_OF_DOOR_TYPES, 10);
}

function pickRandomPosition(min, max) {
  return parseInt(Math.random() * (max - min), 10) + min;
}

function generateRandomDoor() {
  return {
    color: pickRandomDoorColor(),
    panels: pickRandomPanels(),
    middleBarAt: pickRandomPosition(24, 62)
  }
}

export default sceneReducer;
