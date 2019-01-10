import { combineReducers } from 'redux';

import {
  SET_DIMENSION, RUN, STOP, OPEN_RANDOM, CREATE_SET,
  INIT_SIMULATOR_STATE, INIT_INPUT_STATE,
} from './constants';
import { random, createSet, neighbors, open, checkPercolationAndFill } from './utils'

function simulator(state = INIT_SIMULATOR_STATE, action) {
  switch (action.type) {
    case CREATE_SET:
      return { ...state, setWidth: state.elementSize * action.payload.n };

    case RUN:
      return { ...state, running: true };

    case STOP:
      return { ...state, running: false };

    default:
      return state;
  }
}

function dimensions(state = INIT_INPUT_STATE, action) {
  switch (action.type) {
    case SET_DIMENSION:
      return { ...state, n: action.payload.n };

    default:
      return state;
  }
}

function set(state = [], action) {
  switch (action.type) {
    case CREATE_SET:
      const { n } = action.payload;
      let set = createSet(n);

      return neighbors(set, n);

    case OPEN_RANDOM:
      let newState = [...state];
      let closed = state.filter(elem => elem.state === 'close')

      newState = open(newState, random(closed));

      return checkPercolationAndFill(newState);

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  simulator,
  dimensions,
  set,
});

export default rootReducer;
