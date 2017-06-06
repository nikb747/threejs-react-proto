// @flow
import React from 'react'
import * as THREE from 'three'
import {GLOBAL_X_OFFSET, GLOBAL_Y_OFFSET, UNIT_SCALE} from '../constants'

const VacantLot = (props: {x: number, y: number, color: number}) => {
  let actualSize = UNIT_SCALE * 0.94;
  let actualHeight = UNIT_SCALE * 0.1;
  let localOffset = (actualSize - UNIT_SCALE) / 2;
  let position = new THREE.Vector3(
    (props.x * UNIT_SCALE) + GLOBAL_X_OFFSET + localOffset,
    actualHeight / 2,
    (props.y * UNIT_SCALE) + GLOBAL_Y_OFFSET + localOffset);
  return (
    <mesh castShadow
      receiveShadow
      position={position}>
      <boxGeometry width={actualSize} height={actualHeight} depth={actualSize}/>
      <meshPhongMaterial color={props.color} />
    </mesh>
  )
}

export default VacantLot;
