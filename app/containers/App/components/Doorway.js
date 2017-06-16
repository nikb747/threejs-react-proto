// @flow
import React from 'react';
import * as THREE from 'three';
import Door from './Door';
import {
  DOOR_HEIGHT_IN_INCHES,
  DOOR_WIDTH_IN_INCHES,
  GLOBAL_X_OFFSET,
  GLOBAL_Y_OFFSET,
  INCHES_TO_UNITS,
  TRIM_WIDTH_IN_INCHES} from '../constants';

const Doorway = (props: {
    position: {x: number, y: number},
    currentDoorAngle: number,
    targetDoorAngle: number,
    middleBarAt: number,
    panels: number}) => {
  let sideTrimHeight = DOOR_HEIGHT_IN_INCHES * INCHES_TO_UNITS;
  let sideTrimWidth =  TRIM_WIDTH_IN_INCHES * INCHES_TO_UNITS;
  let sideTrimOffsetWidth = sideTrimWidth / 2;
  let topTrimWidth = (DOOR_WIDTH_IN_INCHES + (TRIM_WIDTH_IN_INCHES * 2)) * INCHES_TO_UNITS;
  let topTrimOffsetWidth = topTrimWidth / 2;
  let distanceToRightTrim = (DOOR_WIDTH_IN_INCHES + TRIM_WIDTH_IN_INCHES) * INCHES_TO_UNITS;
  let leftTrimPosition = new THREE.Vector3(
    (props.position.x) + GLOBAL_X_OFFSET + sideTrimOffsetWidth,
    sideTrimHeight / 2,
    (props.position.y) + GLOBAL_Y_OFFSET);

  let rightTrimPosition = new THREE.Vector3(
    (props.position.x) + distanceToRightTrim + (sideTrimWidth / 2) + GLOBAL_X_OFFSET,
    sideTrimHeight / 2,
    (props.position.y) + GLOBAL_Y_OFFSET);

  let topTrimPosition = new THREE.Vector3(
    (props.position.x) + GLOBAL_X_OFFSET + topTrimOffsetWidth,
    sideTrimHeight + (sideTrimWidth / 2),
    (props.position.y) + GLOBAL_Y_OFFSET);
  return (
    <group>
      <mesh castShadow
        receiveShadow
        position={leftTrimPosition}>
        <boxGeometry width={sideTrimWidth} height={sideTrimHeight} depth={INCHES_TO_UNITS * 3}/>
        <meshStandardMaterial color={0x999999} metalness={0.1}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        position={rightTrimPosition}>
        <boxGeometry width={sideTrimWidth} height={sideTrimHeight} depth={INCHES_TO_UNITS * 3}/>
        <meshStandardMaterial color={0x999999} metalness={0.1}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        position={topTrimPosition}>
        <boxGeometry width={topTrimWidth} height={sideTrimWidth} depth={INCHES_TO_UNITS * 3}/>
        <meshStandardMaterial color={0x999999} metalness={0.1}/>
      </mesh>
      <Door
        color={props.color}
        doorwayPosition={props.position}
        panels={props.panels}
        middleBarAt={props.middleBarAt}
        currentDoorAngle={props.currentDoorAngle}
        targetDoorAngle={props.targetDoorAngle}/>
    </group>
  )
}



export default Doorway;
