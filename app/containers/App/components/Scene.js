import React from 'react';
import React3 from 'react-three-renderer';
import {connect} from 'react-redux';
import * as THREE from 'three';
import CityGrid from './CityGrid';
import {GLOBAL_Y_OFFSET, GLOBAL_X_OFFSET} from '../constants';

class Scene extends React.Component {
  fog = new THREE.Fog(0x001525, 10, 40);

  render() {
    const cameraPosition = new THREE.Vector3(
      this.props.camera.position.x,
      this.props.camera.position.y,
      this.props.camera.position.z);
    const cameraRotation = new THREE.Euler(
      this.props.camera.rotation.x,
      this.props.camera.rotation.y,
      this.props.camera.rotation.z);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const d = 20;
    const lightPosition = new THREE.Vector3(d, d, d);
    const lightPosition2 = new THREE.Vector3(0, d * 2, -d /2);
    const lightPosition3 = new THREE.Vector3(0, d/2, d);
    const lightTarget = new THREE.Vector3(0, 0, -8);
    return (
      <React3
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="camera"
        width={width}
        height={height}
        clearColor={this.fog.color}
        shadowMapEnabled
        precision="lowp"
        >
        <scene fog={this.fog}>
          <ambientLight
            color={0xffffff}
          />

          <directionalLight
            color={0xffffff}
            intensity={0.9}

            castShadow

            shadowMapWidth={4096}
            shadowMapHeight={4096}

            shadowCameraLeft={-d}
            shadowCameraRight={d}
            shadowCameraTop={d}
            shadowCameraBottom={-d}

            shadowCameraFar={3 * d}
            shadowCameraNear={d}

            position={lightPosition}
            lookAt={lightTarget}
          />
          <directionalLight
            color={0xffffff}
            intensity={0.5}

            castShadow

            shadowMapWidth={4096}
            shadowMapHeight={4096}

            shadowCameraLeft={-d}
            shadowCameraRight={d}
            shadowCameraTop={d}
            shadowCameraBottom={-d}

            shadowCameraFar={3 * d}
            shadowCameraNear={d}

            position={lightPosition2}
            lookAt={lightTarget}
          />
          <directionalLight
            color={0xffffff}
            intensity={0.2}

            castShadow

            shadowMapWidth={4096}
            shadowMapHeight={4096}

            shadowCameraLeft={-d}
            shadowCameraRight={d}
            shadowCameraTop={d}
            shadowCameraBottom={-d}

            shadowCameraFar={3 * d}
            shadowCameraNear={d}

            position={lightPosition3}
            lookAt={lightTarget}
          />
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={cameraPosition}
            rotation={cameraRotation}
          />
          <CityGrid grid={this.props.city.grid} />
        </scene>
      </React3>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.get('scene').city,
    camera: state.get('scene').camera
  }
}

export default connect(mapStateToProps)(Scene)
