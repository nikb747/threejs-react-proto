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

export const GRID_WIDTH = 20;
export const GRID_LENGTH = 20;
export const GLOBAL_Y_OFFSET = -10;
export const GLOBAL_X_OFFSET = -10;
export const UNIT_SCALE = 1;
