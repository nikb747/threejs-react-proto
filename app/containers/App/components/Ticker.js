// @flow
import React from 'react'
import {connect} from 'react-redux';
import * as THREE from 'three'
import ReactAnimationFrame from 'react-animation-frame'
import {
  increaseBuildingTargetHeight,
  progressTime,
  placeNewBuilding,
  placeStreet,
  reset,
  updateEventStatus} from '../sceneActionCreators'
import {
  FACINGS,
  GRID_WIDTH, GRID_LENGTH,
  BUILDING, STREET, VACANT,
  BUILDING_COLORS} from '../constants'

class Ticker extends React.Component {
  noMoreUpdates = false;
  onAnimationFrame(time) {
    if (!this.noMoreUpdates) {
      if (this.props.ticks >= this.props.nextEventAt) {
        this.generateBuildingEvent();
        this.updateEventState();
      }
      if (this.props.ticks < 500) {
        this.props.handleFrameUpdate();
      } else {
        this.props.handleReset();
      }
    }
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
      let facingIndex = parseInt(Math.random() * FACINGS.length, 10);
      let facing = FACINGS[facingIndex];
      let placeable = false;
      let smallBuilding = parseInt(Math.random() * 5) === 0;
      for (var i = 0; i < FACINGS.length; i++) {
        let faceToTry = FACINGS[(facingIndex + i) % FACINGS.length];
        let tryX = x + faceToTry.direction.x;
        let tryY = y + faceToTry.direction.y;
        let tryX2 = tryX + faceToTry.direction.x;
        let tryY2 = tryY + faceToTry.direction.y;
        if (tryX < 0 || tryX >= GRID_WIDTH) {
          continue;
        }
        if (tryY < 0 || tryY >= GRID_LENGTH) {
          continue;
        }
        if (!(tryX2 < 0 ||
          tryX2 >= GRID_WIDTH ||
          tryY2 < 0 ||
          tryY2 >= GRID_LENGTH ||
          this.props.grid[tryX2][tryY2].lotType !== STREET)) {
          continue;
        }

        if (this.props.grid[tryX][tryY].lotType !== BUILDING) {
            placeable = true;
            facing = faceToTry;
            break;
        }
      }
      if (!placeable) {
        return;
      }

      let goodPositions = [{x, y}];
      if (!smallBuilding) {
        let startFromLeftPositions = [{x, y}];
        let startFromRightPositions = [{x, y}];
        let startFromBackPositions = [{x, y}];
        let backPos = this.applyDirection({x, y}, facing.opposite);
        let leftPos = this.applyDirection({x, y}, facing.left);
        let rightPos = this.applyDirection({x, y}, facing.right);
        if (this.inBounds(rightPos) && this.props.grid[rightPos.x][rightPos.y].lotType === VACANT) {
          startFromRightPositions.push(rightPos);
          let posBackRight = this.applyDirection(rightPos, facing.opposite);
          if (this.inBounds(posBackRight) && this.inBounds(backPos) &&
              this.props.grid[posBackRight.x][posBackRight.y].lotType === VACANT &&
              this.props.grid[backPos.x][backPos.y].lotType === VACANT) {
                startFromRightPositions.push(posBackRight);
                startFromRightPositions.push(backPos);
              }
        }
        if (this.inBounds(leftPos) && this.props.grid[leftPos.x][leftPos.y].lotType === VACANT) {
          startFromLeftPositions.push(leftPos);
          let posBackLeft = this.applyDirection(leftPos, facing.opposite);
          if (this.inBounds(posBackLeft) && this.inBounds(backPos) &&
              this.props.grid[posBackLeft.x][posBackLeft.y].lotType === VACANT &&
              this.props.grid[backPos.x][backPos.y].lotType === VACANT) {
                startFromLeftPositions.push(posBackLeft);
                startFromLeftPositions.push(backPos);
              }
        }
        if (this.inBounds(backPos) && this.props.grid[backPos.x][backPos.y].lotType === VACANT) {
          startFromBackPositions.push(backPos);
        }
        if (startFromBackPositions.length > goodPositions.length) {
          goodPositions = startFromBackPositions;
        }
        if (startFromLeftPositions.length > goodPositions.length) {
          goodPositions = startFromLeftPositions;
        }
        if (startFromRightPositions.length > goodPositions.length) {
          goodPositions = startFromRightPositions;
        }
      }

      let newBuilding = {
        color: this.pickBuildingColor(),
        connectedLots: goodPositions,
        name: `building_${x}-${y}`,
        facing: facing
      }
      this.props.handlePlaceBuilding(x, y, newBuilding);
      this.props.handlePlaceStreet(x + facing.direction.x, y + facing.direction.y, facing);
    }
  }
  render() {
    return (<h1>{this.props.ticks}</h1>)
  }
  pickBuildingColor() {
    return BUILDING_COLORS[parseInt(Math.random() * BUILDING_COLORS.length)];
  }
  inBounds(pos: {x: number, y: number}) {
    return (pos.x >= 0 && pos.x < GRID_WIDTH && pos.y >= 0 && pos.y < GRID_LENGTH);
  }
  applyDirection(pos: {x:number, y:number}, direction: {x: number, y:number}) {
    return {x: pos.x + direction.x, y: pos.y + direction.y};
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
    dispatch(updateEventStatus(parseInt(Math.random() * 5, 10) + 5));
  },
  handleBuildingShouldGrow(x: number, y: number) {
    dispatch(increaseBuildingTargetHeight(x, y));
  },
  handlePlaceBuilding(x: number, y: number, building: {color: number, connectedLots: Array, name: string}) {
    dispatch(placeNewBuilding(x, y, building));
  },
  handlePlaceStreet(x: number, y: number, facing: Object) {
    dispatch(placeStreet(x,y, facing));
  },
  handleReset() {
    dispatch(reset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactAnimationFrame(Ticker, 20));
