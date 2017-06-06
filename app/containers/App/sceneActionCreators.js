// @flow
import {
  INCREASE_BUILDING_TARGET_HEIGHT,
  PROGRESS_TIME,
  PLACE_BUILDING,
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

export function increaseBuildingTargetHeight(x: number, y: number) {
  return {
    type: INCREASE_BUILDING_TARGET_HEIGHT,
    payload: {x, y}
  }
}

export function placeNewBuilding(x: number, y: number, building: {
  color: number,
  name: string,
  connectedLots: Array,

}) {
  return {
    type: PLACE_BUILDING,
    payload: {x, y, ...building}
  }
}
