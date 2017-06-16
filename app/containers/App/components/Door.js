// @flow
import React from 'react';
import * as THREE from 'three';
import NoPanelDoor from './NoPanelDoor';
import OnePanelDoor from './OnePanelDoor';
import TwoPanelDoor from './TwoPanelDoor';
import ThreePanelDoor from './ThreePanelDoor';
import SimpleDoorKnob from './SimpleDoorKnob';
import {
  GLOBAL_X_OFFSET,
  GLOBAL_Y_OFFSET,
  INCHES_TO_UNITS} from '../constants';

class Door extends React.Component {
  renderDoor() {
    switch (this.props.panels) {
      case 0 :
        return (<NoPanelDoor doorwayPosition={this.props.doorwayPosition} color={this.props.color}/>);

      case 1 :
        return (<OnePanelDoor doorwayPosition={this.props.doorwayPosition} color={this.props.color}/>);

      case 2 :
        return (<TwoPanelDoor doorwayPosition={this.props.doorwayPosition} middleBarAt={this.props.middleBarAt} color={this.props.color}/>);

      case 3 :
        return (<ThreePanelDoor doorwayPosition={this.props.doorwayPosition} middleBarAt={this.props.middleBarAt} color={this.props.color}/>);

      default :
        return (<NoPanelDoor doorwayPosition={this.props.doorwayPosition} color={this.props.color}/>)
    }
  }
  renderDoorKnob() {
    if (this.props.hingesOnRight) {
      return <SimpleDoorKnob doorwayPosition={this.props.doorwayPosition} hingesOnRight />
    }
    return <SimpleDoorKnob doorwayPosition={this.props.doorwayPosition} />
  }
  render() {
    let rotation = new THREE.Euler(0, this.props.currentDoorAngle * Math.PI / 180, 0);
    let position = new THREE.Vector3(
      this.props.doorwayPosition.x + GLOBAL_X_OFFSET,
      0,
      this.props.doorwayPosition.y + GLOBAL_Y_OFFSET);
    return(
      <group rotation={rotation} position={position}>
        {this.renderDoor()}
        {this.renderDoorKnob()}
      </group>
    );
  }
}

export default Door;
