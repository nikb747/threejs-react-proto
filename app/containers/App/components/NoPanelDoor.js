// @flow
import React from 'react';
import * as THREE from 'three';
import {
  DOOR_HEIGHT_IN_INCHES,
  DOOR_THICKNESS_IN_INCHES,
  DOOR_WIDTH_IN_INCHES,
  GLOBAL_X_OFFSET,
  GLOBAL_Y_OFFSET,
  INCHES_TO_UNITS,
  TRIM_WIDTH_IN_INCHES,
  UNIT_SCALE} from '../constants';

const NoPanelDoor = (props: {doorwayPosition: {x: number, y: number}, color: number}) => {
  let doorWidth = DOOR_WIDTH_IN_INCHES * INCHES_TO_UNITS;
  let doorHeight = DOOR_HEIGHT_IN_INCHES * INCHES_TO_UNITS
  let trimOffsetWidth = (TRIM_WIDTH_IN_INCHES + (DOOR_WIDTH_IN_INCHES / 2)) * INCHES_TO_UNITS;
  let position = new THREE.Vector3(
    trimOffsetWidth,
    doorHeight / 2,
    0);
  return (
    <group>
      <mesh castShadow
        receiveShadow
        position={position}>
        <boxGeometry width={doorWidth} height={doorHeight} depth={INCHES_TO_UNITS * DOOR_THICKNESS_IN_INCHES}/>
        <meshStandardMaterial color={props.color} metalness={0.1} roughness={0.8}/>
      </mesh>
    </group>
  )
}

export default NoPanelDoor;
