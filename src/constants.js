export const SET_WIDTH = 'SET_WIDTH';
export const SET_HEIGHT = 'SET_HEIGHT';
export const RUN = 'RUN';
export const STOP = 'STOP';
export const OPEN_RANDOM = 'OPEN_RANDOM';
export const CREATE_SET = 'CREATE_SET';

export const INIT_INPUT_STATE = {
  height: 10,
  width: 10,
};

export const INIT_SIMULATOR_STATE = {
  elementSize: 15,
  running: false,
  setWidth: 15 * INIT_INPUT_STATE.width,
  percolates: false,
};

export const SIMULATOR_COLORS = {
  open: '#fff',
  close: '#212121',
  fill: '#0d47a1',
};

export const SIMULATOR_STATES = {
  OPEN: 'open',
  CLOSE: 'close',
  FILL: 'fill'
};
