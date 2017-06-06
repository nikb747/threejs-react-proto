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
          streets.push(<Street x={x} y={y} key={`${x}-${y}`}/>)
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
          buildings.push(<Building x={x} y={y} key={`${x}-${y}`} color={blocks[y].color} height={blocks[y].currentHeight}/>)
        }
      }
    }
    return buildings;
  }
  render() {
    return (<group>
        {this.renderLots()}
        {this.renderBuildings()}
      </group>);
  }
}

export default CityGrid
