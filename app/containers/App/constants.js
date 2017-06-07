/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const VACANT = 'vacant';
export const BUILDING = 'building';
export const STREET = 'street';

export const NORTH = {x: 0, y: -1};
export const EAST = {x: 1, y: 0};
export const SOUTH = {x: 0, y: 1};
export const WEST = {x: -1, y: 0};
export const NONE = {x: 0, y:0};

export const FACING_NORTH = {
  direction: NORTH,
  opposite: SOUTH,
  left: WEST,
  right: EAST
}
export const FACING_SOUTH = {
  direction: SOUTH,
  opposite: NORTH,
  left: EAST,
  right: WEST
}
export const FACING_EAST = {
  direction: EAST,
  opposite: WEST,
  left: NORTH,
  right: SOUTH
}
export const FACING_WEST = {
  direction: WEST,
  opposite: EAST,
  left: SOUTH,
  right: NORTH
}
export const FACING_NONE = {
  direction: NONE,
  opposite: NONE,
  left: NONE,
  right: NONE
}
export const FACINGS = [FACING_NORTH, FACING_EAST, FACING_SOUTH, FACING_WEST];
export const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

export const GRID_WIDTH = 24;
export const GRID_LENGTH = 20;
export const GLOBAL_Y_OFFSET = -10;
export const GLOBAL_X_OFFSET = -12;
export const UNIT_SCALE = 1;

export const BUILDING_COLORS = [
  0x974713, 0xE47833, 0xFF8D45,
  0x039398, 0x33DEE4
];
