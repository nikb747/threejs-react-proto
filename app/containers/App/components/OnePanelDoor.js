// @flow
import React from 'react';
import * as THREE from 'three';
import DoorPanel from './DoorPanel';
import {
  DOOR_HEIGHT_IN_INCHES,
  DOOR_THICKNESS_IN_INCHES,
  DOOR_WIDTH_IN_INCHES,
  GLOBAL_X_OFFSET,
  GLOBAL_Y_OFFSET,
  INCHES_TO_UNITS,
  TRIM_WIDTH_IN_INCHES,
  UNIT_SCALE} from '../constants';

const OnePanelDoor = (props: {doorwayPosition: {x: number, y: number}, color: number}) => {
  let doorWidth = DOOR_WIDTH_IN_INCHES * INCHES_TO_UNITS;
  let doorHeight = DOOR_HEIGHT_IN_INCHES * INCHES_TO_UNITS;
  let doorFrameSize = 6 * INCHES_TO_UNITS;
  let doorFrameBottomSize = 12 * INCHES_TO_UNITS;
  let trimOffsetWidth = (TRIM_WIDTH_IN_INCHES + (DOOR_WIDTH_IN_INCHES / 2)) * INCHES_TO_UNITS;
  let leftPosition = new THREE.Vector3(
    trimOffsetWidth - (doorWidth / 2) + (doorFrameSize / 2),
    doorHeight / 2,
    0);

  let rightPosition = new THREE.Vector3(
    trimOffsetWidth + (doorWidth / 2) - (doorFrameSize / 2),
    doorHeight / 2,
    0);

  let topPosition = new THREE.Vector3(
    trimOffsetWidth,
    doorHeight - (doorFrameSize / 2),
    0);

  let bottomPosition = new THREE.Vector3(
    trimOffsetWidth,
    (doorFrameBottomSize / 2),
    0);
  let panelPosition = new THREE.Vector3(
    trimOffsetWidth - ((doorWidth - doorFrameSize - doorFrameSize) / 2),
    doorFrameBottomSize,
    (-DOOR_THICKNESS_IN_INCHES * INCHES_TO_UNITS / 2));
  return (
    <group>
      <mesh castShadow
        receiveShadow
        position={leftPosition}>
        <boxGeometry width={doorFrameSize} height={doorHeight} depth={INCHES_TO_UNITS * DOOR_THICKNESS_IN_INCHES}/>
        <meshStandardMaterial color={props.color} metalness={0.1} roughness={0.8}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        position={rightPosition}>
        <boxGeometry width={doorFrameSize} height={doorHeight} depth={INCHES_TO_UNITS * DOOR_THICKNESS_IN_INCHES}/>
        <meshStandardMaterial color={props.color} metalness={0.1} roughness={0.8}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        position={topPosition}>
        <boxGeometry width={doorWidth} height={doorFrameSize} depth={INCHES_TO_UNITS * DOOR_THICKNESS_IN_INCHES}/>
        <meshStandardMaterial color={props.color} metalness={0.1} roughness={0.8}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        position={bottomPosition}>
        <boxGeometry width={doorWidth} height={doorFrameBottomSize} depth={INCHES_TO_UNITS * DOOR_THICKNESS_IN_INCHES}/>
        <meshStandardMaterial color={props.color} metalness={0.1} roughness={0.8}/>
      </mesh>
      <DoorPanel
        width={doorWidth - (doorFrameSize * 2)}
        height={doorHeight - doorFrameSize - doorFrameBottomSize}
        position={panelPosition} color={props.color}/>
    </group>
  )
}

export default OnePanelDoor;
