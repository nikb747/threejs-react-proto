// @flow
import React from 'react';
import * as THREE from 'three';

const Floor = () => {
  let rotation = new THREE.Euler(-90 * Math.PI / 180, 0, 0);
  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        rotation={rotation}
        >
        <planeGeometry width={40} height={15}/>
        <meshStandardMaterial color={0x666644} metalness={0.1}/>
      </mesh>
    </group>
  )
}

export default Floor;
