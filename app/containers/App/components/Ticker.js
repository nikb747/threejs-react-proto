// @flow
import React from 'react';
import {connect} from 'react-redux';
import * as THREE from 'three';
import ReactAnimationFrame from 'react-animation-frame';
import {
  progressTime,
  reset,
  swingDoor,
  updateEventStatus} from '../sceneActionCreators';

class Ticker extends React.Component {
  noMoreUpdates = false;
  onAnimationFrame(time) {
    if (!this.noMoreUpdates) {
      this.props.handleFrameUpdate();
      if (this.props.ticks > 125) {
        this.props.handleReset();
      }
    }
    if (this.props.currentDoorAngle !== this.props.targetDoorAngle) {
      this.props.handleDoorSwing();
    }
  }
  updateEventState() {
    this.props.handleEventStatusUpdate();
  }
  render() {
    return (<h1>{this.props.ticks}</h1>)
  }
}


const mapStateToProps = state => {
  return ({
    ticks: state.get("scene").ticks,
    nextEventAt: state.get("scene").nextEventAt,
    currentDoorAngle: state.get("scene").currentDoorAngle,
    targetDoorAngle: state.get("scene").targetDoorAngle
  });
}

const mapDispatchToProps = (dispatch: Function) => ({
  handleFrameUpdate() {
    dispatch(progressTime())
  },
  handleEventStatusUpdate() {
    dispatch(updateEventStatus(parseInt(Math.random() * 50, 10) + 50));
  },
  handleReset() {
    dispatch(reset());
  },
  handleDoorSwing() {
    dispatch(swingDoor());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactAnimationFrame(Ticker, 20));
