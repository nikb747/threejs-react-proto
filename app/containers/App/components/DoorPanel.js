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

const DoorPanel = (props: {width:number, height: number, position: Object, color: number}) => {
  let shape = new THREE.Shape();
  shape.moveTo( INCHES_TO_UNITS, INCHES_TO_UNITS );
  shape.lineTo( INCHES_TO_UNITS, props.height - INCHES_TO_UNITS );
  shape.lineTo( props.width - INCHES_TO_UNITS, props.height - INCHES_TO_UNITS);
  shape.lineTo( props.width - INCHES_TO_UNITS, INCHES_TO_UNITS );
  shape.lineTo( INCHES_TO_UNITS, INCHES_TO_UNITS );
  let shapes = [shape];

  return (
    <group position={props.position}>
      <mesh castShadow
        receiveShadow>
        <extrudeGeometry
          shapes={shapes}
          steps={1}
          amount={INCHES_TO_UNITS}
          bevelEnabled
          bevelThickness={INCHES_TO_UNITS}
          bevelSize={INCHES_TO_UNITS}
          bevelSegments={1}
        />
        <meshStandardMaterial color={props.color} metalness={0.1} roughness={0.8}/>
      </mesh>
    </group>
  )
}

export default DoorPanel;
