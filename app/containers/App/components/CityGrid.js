// @flow
import React from 'react'
import {connect} from 'react-redux'
import * as THREE from 'three'
import Street from './Street'
import VacantLot from './VacantLot'
import Building from './Building'
import {VACANT, STREET, BUILDING} from '../constants'

class CityGrid extends React.Component {
  renderLots() {
    let vacantLots = [];
    for (var x = 0; x < this.props.grid.length; x++) {
      let blocks = this.props.grid[x];
      for (var y = 0; y < blocks.length; y++) {
        if (blocks[y].lotType === VACANT) {
          vacantLots.push(<VacantLot x={x} y={y} color={blocks[y].color} key={`${x}-${y}`}/>)
        }
      }
    }
    return vacantLots;
  }
  renderStreets() {
    let streets = [];
    for (var x = 0; x < this.props.grid.length; x++) {
      let blocks = this.props.grid[x];
      for (var y = 0; y < blocks.length; y++) {
        if (blocks[y].lotType === STREET) {
          streets.push(<Street x={x} y={y} key={`${x}-${y}`} color={0x666666}/>)
        }
      }
    }
    return streets;
  }
  renderBuildings() {
    let buildings = [];
    for (var x = 0; x < this.props.grid.length; x++) {
      let blocks = this.props.grid[x];
      for (var y = 0; y < blocks.length; y++) {
        if (blocks[y].lotType === BUILDING) {
          let topLeftLot = this.topLeftMostLot(blocks[y].connectedLots);
          if (topLeftLot.x === x && topLeftLot.y === y) {
            let dimensions = this.dimensionOfLots(blocks[y].connectedLots);
            buildings.push(<Building
              x={x}
              y={y}
              width={dimensions.width}
              length={dimensions.length}
              key={`${x}-${y}`}
              color={blocks[y].color}
              height={blocks[y].currentHeight}/>)
          }
        }
      }
    }
    return buildings;
  }
  dimensionOfLots(connectedLots: Array<Object>) {
    let maxX = connectedLots[0].x;
    let minX = connectedLots[0].x;
    let maxY = connectedLots[0].y;
    let minY = connectedLots[0].y;
    for (var i = 0; i < connectedLots.length; i++) {
      if (connectedLots[i].x > maxX) {
        maxX = connectedLots[i].x;
      }
      if (connectedLots[i].x < minX) {
        minX = connectedLots[i].x;
      }
      if (connectedLots[i].y > maxY) {
        maxY = connectedLots[i].y;
      }
      if (connectedLots[i].y < minY) {
        minY = connectedLots[i].y;
      }
    }
    return {width: maxX - minX + 1, length: maxY - minY + 1};
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
        {this.renderBuildings()}
        {this.renderStreets()}
      </group>);
  }
}

export default CityGrid
