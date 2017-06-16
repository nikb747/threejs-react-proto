// @flow
import {
  PROGRESS_TIME,
  SWING_DOOR,
  RESET,
  UPDATE_EVENT_STATUS} from './sceneActions';

export function updateEventStatus(value: number) {
  return {
    type: UPDATE_EVENT_STATUS,
    payload: value
  }
}
export function progressTime() {
  return {
    type: PROGRESS_TIME,
    payload: 1
  }
}

export function swingDoor() {
  return {
    type: SWING_DOOR
  }
}

export function reset() {
  return {
    type: RESET
  }
}
