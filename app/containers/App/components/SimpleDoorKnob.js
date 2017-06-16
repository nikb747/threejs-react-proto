// @flow
import React from 'react';
import * as THREE from 'three';
import {
  DOOR_HEIGHT_IN_INCHES,
  DOOR_THICKNESS_IN_INCHES,
  DOOR_WIDTH_IN_INCHES,
  DOORKNOB_DISTANCE_FROM_FLOOR_IN_INCHES,
  DOORKNOB_DISTANCE_FROM_DOORWAY_IN_INCHES,
  GLOBAL_X_OFFSET,
  GLOBAL_Y_OFFSET,
  INCHES_TO_UNITS,
  TRIM_WIDTH_IN_INCHES,
  UNIT_SCALE} from '../constants';

const SimpleDoorKnob = (props: {doorwayPosition: {x: number, y: number}, hingesOnRight: boolean}) => {
  let rotation = new THREE.Euler(90 * Math.PI / 180, 0, 0);
  let distanceFromDoorway = (TRIM_WIDTH_IN_INCHES + DOORKNOB_DISTANCE_FROM_DOORWAY_IN_INCHES) * INCHES_TO_UNITS;
  if (!props.hingesOnRight) {
    distanceFromDoorway = (TRIM_WIDTH_IN_INCHES + DOOR_WIDTH_IN_INCHES - DOORKNOB_DISTANCE_FROM_DOORWAY_IN_INCHES) * INCHES_TO_UNITS;
  }
  let plateHeight = 0.5 * INCHES_TO_UNITS;
  let plateRadius = 1.5 * INCHES_TO_UNITS;

  let neckHeight = 2.5 * INCHES_TO_UNITS;
  let neckRadius = 0.75 * INCHES_TO_UNITS;

  let knobRadius = 1.5 * INCHES_TO_UNITS;

  let platePosition = new THREE.Vector3(
    distanceFromDoorway,
    DOORKNOB_DISTANCE_FROM_FLOOR_IN_INCHES * INCHES_TO_UNITS,
    DOOR_THICKNESS_IN_INCHES * INCHES_TO_UNITS);

  let spherePosition = new THREE.Vector3(
    distanceFromDoorway,
    DOORKNOB_DISTANCE_FROM_FLOOR_IN_INCHES * INCHES_TO_UNITS,
    DOOR_THICKNESS_IN_INCHES * INCHES_TO_UNITS + neckHeight);

  return (
    <group>
      <mesh castShadow
        receiveShadow
        rotation={rotation}
        position={platePosition}>
        <cylinderGeometry
          radiusTop={plateRadius}
          radiusBottom={plateRadius}
          height={plateHeight}/>
        <meshStandardMaterial color={0x9999aa} metalness={0.7}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        rotation={rotation}
        position={platePosition}>
        <cylinderGeometry
          radiusTop={neckRadius}
          radiusBottom={neckRadius}
          height={neckHeight}/>
        <meshStandardMaterial color={0x9999aa} metalness={0.7}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        rotation={rotation}
        position={spherePosition}>
        <sphereGeometry
          radius={knobRadius}/>
        <meshStandardMaterial color={0x9999aa} metalness={0.7}/>
      </mesh>
    </group>
  )
}

export default SimpleDoorKnob;
