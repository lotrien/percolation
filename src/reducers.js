import { combineReducers } from 'redux';

import {
  SET_WIDTH, SET_HEIGHT, RUN, STOP, OPEN_RANDOM, CREATE_SET,
  INIT_SIMULATOR_STATE, INIT_INPUT_STATE,
} from './constants';
import { random, createSet, neighbors, open, checkPercolationAndFill } from './utils'

function simulator(state = INIT_SIMULATOR_STATE, action) {
  switch (action.type) {
    case CREATE_SET:
      return { ...state, setWidth: state.elementSize * action.payload.width };

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
    case SET_WIDTH:
      return { ...state, width: action.payload.width };

    case SET_HEIGHT:
      return { ...state, height: action.payload.height };

    default:
      return state;
  }
}

function set(state = [], action) {
  switch (action.type) {
    case CREATE_SET:
      const { width, height } = action.payload;
      let set = createSet(width, height);

      return neighbors(set, width, height);

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
