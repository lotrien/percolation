export const RUN = 'RUN';
export const STOP = 'STOP';
export const OPEN_RANDOM = 'OPEN_RANDOM';
export const CREATE_DISJOINT_SET = 'CREATE_DISJOINT_SET';
export const ADD_STATS = 'ADD_STATS';

export const INIT_INPUT_STATE = { n: 10 };

export const INIT_SIMULATOR_STATE = {
  elementSize: 15,
  running: false,
  setWidth: 15 * INIT_INPUT_STATE.n,
};

export const SIMULATOR_COLORS = {
  open: '#fff',
  close: '#212121',
  full: '#0d47a1',
};
