import { combineReducers } from 'redux';

import {
  SET_DIMENSION, RUN, STOP, OPEN_RANDOM, CREATE_DISJOINT_SET,
  INIT_SIMULATOR_STATE, INIT_INPUT_STATE, ADD_STATS,
} from './constants';
import { random, createSet, neighbors, open, checkPercolationAndFill } from './utils'

function simulator(state = INIT_SIMULATOR_STATE, action) {
  switch (action.type) {
    case CREATE_DISJOINT_SET:
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

function disjointSet(state = [], action) {
  switch (action.type) {
    case CREATE_DISJOINT_SET:
      const { n } = action.payload;
      let disjointSet = createSet(n);

      return neighbors(disjointSet, n);

    case OPEN_RANDOM:
      let newState = [...state];
      let closed = state.filter(elem => elem.state === 'close')

      newState = open(newState, random(closed));

      return checkPercolationAndFill(newState);

    default:
      return state;
  }
}

function stats(state = [], action) {
  switch (action.type) {
    case ADD_STATS:
      const { n, count } = action.payload;
      return [
        ...state,
        {
          key: state.length + 1,
          n,
          count,
        }
      ];

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  simulator,
  dimensions,
  disjointSet,
  stats,
});

export default rootReducer;
