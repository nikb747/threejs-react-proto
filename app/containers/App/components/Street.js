// @flow
import React from 'react'
import * as THREE from 'three'
import {GLOBAL_X_OFFSET, GLOBAL_Y_OFFSET, UNIT_SCALE} from '../constants'

const Street = (props: {x: number, y: number, color: number}) => {
  let actualSize = UNIT_SCALE
  let actualHeight = UNIT_SCALE * 0.15;
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
      <meshStandardMaterial color={props.color}/>
    </mesh>
  )
}

export default Street;
