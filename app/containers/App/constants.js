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

export const GLOBAL_Y_OFFSET = -10;
export const GLOBAL_X_OFFSET = -20;
export const UNIT_SCALE = 1;
export const INCHES_TO_UNITS = 0.1;
export const TRIM_WIDTH_IN_INCHES = 3;
export const DOOR_WIDTH_IN_INCHES = 36;
export const DOOR_HEIGHT_IN_INCHES = 80;
export const DOOR_THICKNESS_IN_INCHES = 2;
export const DOORKNOB_DISTANCE_FROM_DOORWAY_IN_INCHES = 4;
export const DOORKNOB_DISTANCE_FROM_FLOOR_IN_INCHES = 36;
export const DOOR_COLORS = [0x88887f, 0x887f88, 0x7f8888, 0x887f7f, 0x7f887f, 0x7f7f88];
export const NUMBER_OF_DOOR_TYPES = 4;
