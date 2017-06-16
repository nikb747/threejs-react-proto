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

const Oreo = () => {
  let rotation = new THREE.Euler(75 * Math.PI / 180, 0, 0);
  let cookieHeight = 4 * INCHES_TO_UNITS;
  let cookieRadius = 20 * INCHES_TO_UNITS;

  let creamHeight = 5 * INCHES_TO_UNITS;
  let creamRadius = 16 * INCHES_TO_UNITS;

  let jellyRadius = 10 * INCHES_TO_UNITS;
  let jellyHeight = 6 * INCHES_TO_UNITS;

  let cookiePosition = new THREE.Vector3(0, 5, 0);

  return (
    <group>
      <mesh castShadow
        receiveShadow
        rotation={rotation}
        position={cookiePosition}>
        <cylinderGeometry
          radiusTop={cookieRadius}
          radiusBottom={cookieRadius}
          height={cookieHeight}
          radialSegments={128}
        />
        <meshStandardMaterial
          color={0xcdac6f}
          metalness={0.0}
          roughness={1}
        />
      </mesh>
      <mesh castShadow
        receiveShadow
        rotation={rotation}
        position={cookiePosition}>
        <cylinderGeometry
          radiusTop={creamRadius}
          radiusBottom={creamRadius}
          height={creamHeight}
          radialSegments={128}
        />
        <meshStandardMaterial
          color={0xe3dec5}
          metalness={0.0}
          roughness={1}
        />
      </mesh>
      <mesh castShadow
        receiveShadow
        rotation={rotation}
        position={cookiePosition}>
        <cylinderGeometry
          radiusTop={jellyRadius}
          radiusBottom={jellyRadius}
          height={jellyHeight}
          radialSegments={128}
        />
        <meshStandardMaterial
          color={0x412228}
          metalness={0.0}
          emissive={0x69000c}
          roughness={0}
        />
      </mesh>
    </group>
  )
}

export default Oreo;
