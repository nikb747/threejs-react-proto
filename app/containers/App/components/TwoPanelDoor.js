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

const TwoPanelDoor = (props: {doorwayPosition: {x: number, y: number}}, middleBarAt: number, color: number) => {
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

  let middlePosition = new THREE.Vector3(
    trimOffsetWidth,
    (props.middleBarAt * INCHES_TO_UNITS),
    0);

  let topPanelPosition = new THREE.Vector3(
    trimOffsetWidth - ((doorWidth - doorFrameSize - doorFrameSize) / 2),
    (props.middleBarAt * INCHES_TO_UNITS) + (doorFrameSize / 2),
    (-DOOR_THICKNESS_IN_INCHES * INCHES_TO_UNITS / 2));

  let bottomPanelPosition = new THREE.Vector3(
    trimOffsetWidth - ((doorWidth - doorFrameSize - doorFrameSize) / 2),
    doorFrameBottomSize,
    (-DOOR_THICKNESS_IN_INCHES * INCHES_TO_UNITS / 2));

  let topPanelHeight = doorHeight - doorFrameSize - (props.middleBarAt * INCHES_TO_UNITS) - (doorFrameSize / 2);
  let bottomPanelHeight = (props.middleBarAt * INCHES_TO_UNITS) - (doorFrameSize / 2) - doorFrameBottomSize;
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
      <mesh castShadow
        receiveShadow
        position={middlePosition}>
        <boxGeometry width={doorWidth} height={doorFrameSize} depth={INCHES_TO_UNITS * DOOR_THICKNESS_IN_INCHES}/>
        <meshStandardMaterial color={props.color} metalness={0.1} roughness={0.8}/>
      </mesh>
      <DoorPanel
        width={doorWidth - (doorFrameSize * 2)}
        height={topPanelHeight}
        position={topPanelPosition}
        color={props.color} />
      <DoorPanel
        width={doorWidth - (doorFrameSize * 2)}
        height={bottomPanelHeight}
        position={bottomPanelPosition}
        color={props.color} />
    </group>
  )
}

export default TwoPanelDoor;
