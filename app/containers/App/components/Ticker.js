// @flow
import React from 'react'
import {connect} from 'react-redux';
import * as THREE from 'three'
import ReactAnimationFrame from 'react-animation-frame'
import {increaseBuildingTargetHeight, progressTime, placeNewBuilding, updateEventStatus} from '../sceneActionCreators'
import {GRID_WIDTH, GRID_LENGTH, BUILDING, VACANT} from '../constants'

class Ticker extends React.Component {
  onAnimationFrame(time) {
    if (this.props.ticks >= this.props.nextEventAt) {
      this.generateBuildingEvent();
      this.updateEventState();
    }
    this.props.handleFrameUpdate();
  }
  updateEventState() {
    this.props.handleEventStatusUpdate();
  }
  generateBuildingEvent() {
    let x = parseInt(Math.random() * GRID_WIDTH, 10);
    let y = parseInt(Math.random() * GRID_LENGTH, 10);
    let lot = this.props.grid[x][y];
    if (lot.lotType === BUILDING) {
      this.props.handleBuildingShouldGrow(x, y);
    } else if (lot.lotType === VACANT) {
      let newBuilding = {
        color: 0x999933,
        connectedLots: [{x, y}],
        name: `building_${x}-${y}`
      }
      this.props.handleNewBuilding(x, y, newBuilding)
    }
  }
  render() {
    return (<h1>{this.props.ticks}</h1>)
  }
}
const mapStateToProps = state => {
  return ({
    ticks: state.get("scene").ticks,
    nextEventAt: state.get("scene").nextEventAt,
    grid: state.get("scene").city.grid
  });
}
const mapDispatchToProps = (dispatch: Function) => ({
  handleFrameUpdate() {
    dispatch(progressTime())
  },
  handleEventStatusUpdate() {
    dispatch(updateEventStatus((Math.random() * 10) + 10));
  },
  handleBuildingShouldGrow(x: number, y: number) {
    dispatch(increaseBuildingTargetHeight(x, y));
  },
  handleNewBuilding(x: number, y: number, building: {color: number, connectedLots: Array, name: string}) {
    dispatch(placeNewBuilding(x, y, building));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactAnimationFrame(Ticker, 20));
