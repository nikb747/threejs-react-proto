import React from 'react'
import React3 from 'react-three-renderer';
import {connect} from 'react-redux'
import * as THREE from 'three'
import CityGrid from './CityGrid'

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
    const lightTarget = new THREE.Vector3(0, 0, 0);
    return (
      <React3
        antialias
        mainCamera="camera"
        width={width}
        height={height}
        clearColor={this.fog.color}
        shadowMapEnabled
        >
        <scene >
          <ambientLight
            color={0xaaaaaa}
          />
          <directionalLight
            color={0xffffff}
            intensity={0.9}

            castShadow

            shadowMapWidth={1024}
            shadowMapHeight={1024}

            shadowCameraLeft={-d}
            shadowCameraRight={d}
            shadowCameraTop={d}
            shadowCameraBottom={-d}

            shadowCameraFar={3 * d}
            shadowCameraNear={d}

            position={lightPosition}
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
