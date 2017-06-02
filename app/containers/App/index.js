/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class App extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node
  };
  cameraPosition = new THREE.Vector3(0, 0, 5);

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (
      <div>
        {React.Children.toArray(this.props.children)}
        <React3 mainCamera="camera" width={width} height={height}>
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
            />
            <mesh>
              <boxGeometry width={1} height={1} depth={1} />
              <meshBasicMaterial color={0x00ff00} />
            </mesh>
          </scene>
        </React3>
      </div>
    );
  }
}
