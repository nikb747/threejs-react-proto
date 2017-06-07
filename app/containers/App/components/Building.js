// @flow
import React from 'react'
import * as THREE from 'three'
import {GLOBAL_X_OFFSET, GLOBAL_Y_OFFSET, UNIT_SCALE} from '../constants'

const Building = (props: {
    x: number,
    y: number,
    width: number,
    length: number,
    color: number,
    height: number}) => {
  let actualWidth = UNIT_SCALE * props.width;
  let actualLength = UNIT_SCALE * props.length;


  let actualHeight = UNIT_SCALE * props.height;
  let localOffsetWidth = (UNIT_SCALE * (props.width - 1)) / 2;
  let localOffsetLength = (UNIT_SCALE * (props.length - 1)) / 2;

  let position = new THREE.Vector3(
    (props.x * UNIT_SCALE) + GLOBAL_X_OFFSET + localOffsetWidth,
    actualHeight / 2,
    (props.y * UNIT_SCALE) + GLOBAL_Y_OFFSET + localOffsetLength);
  return (
    <group>
      <mesh castShadow
        receiveShadow
        position={position}>
        <boxGeometry width={actualWidth} height={actualHeight} depth={actualLength}/>
        <meshStandardMaterial color={props.color} metalness={0.5}/>
      </mesh>
      <mesh castShadow
        receiveShadow
        position={position}>
        <boxGeometry width={actualWidth - 0.2} height={actualHeight + 0.2} depth={actualLength - 0.2}/>
        <meshStandardMaterial color={props.color} metalness={0.8}/>
      </mesh>
    </group>

  )
}

export default Building;
