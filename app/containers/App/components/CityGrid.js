// @flow
import React from 'react'
import {connect} from 'react-redux'
import * as THREE from 'three'
import Doorway from './Doorway'
import VacantLot from './VacantLot'
import {VACANT, DOORWAY} from '../constants'

class CityGrid extends React.Component {
  renderLots() {
    let vacantLots = [];
    for (var x = 0; x < this.props.grid.length; x++) {
      let blocks = this.props.grid[x];
      for (var y = 0; y < blocks.length; y++) {
        vacantLots.push(<VacantLot x={x} y={y} color={blocks[y].color} key={`${x}-${y}`}/>)
      }
    }
    return vacantLots;
  }
  renderDoorways() {
    let doorways = [];
    for (var x = 0; x < this.props.grid.length; x++) {
      let blocks = this.props.grid[x];
      for (var y = 0; y < blocks.length; y++) {
        if (blocks[y].lotType === DOORWAY) {
          let topLeftLot = this.topLeftMostLot(blocks[y].connectedLots);
          if (topLeftLot.x === x && topLeftLot.y === y) {
            doorways.push(<Doorway
              position={{x,y}}
              key={`${x}-${y}`}
              color={blocks[y].color}/>)
          }
        }
      }
    }
    return doorways;
  }
  topLeftMostLot(connectedLots: Array<Object>) {
    let topLeftMost = connectedLots[0];
    for (var i = 0; i < connectedLots.length; i++) {
      if (connectedLots[i].x < topLeftMost.x) {
        topLeftMost = connectedLots[i];
      } else if (connectedLots[i].x === topLeftMost.x && connectedLots[i].y < topLeftMost.y) {
        topLeftMost = connectedLots[i];
      }
    }
    return topLeftMost;
  }
  render() {
    return (<group>
        {this.renderLots()}
        {this.renderDoorways()}
      </group>);
  }
}

export default CityGrid
