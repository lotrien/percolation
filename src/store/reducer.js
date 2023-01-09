import {
  RUN,
  STOP,
  OPEN_RANDOM,
  CREATE_DISJOINT_SET,
  ADD_STATS,
} from './actionTypes';
import { random } from '../utils/utils';
import Percolation from '../utils/Percolation';
import { INIT_INPUT_STATE } from '../constants';

const INIT_SIMULATOR_STATE = {
  running: false,
  n: INIT_INPUT_STATE.n,
};

function simulator(state = INIT_SIMULATOR_STATE, action) {
  switch (action.type) {
    case CREATE_DISJOINT_SET:
      return { ...state, n: action.payload.n };

    case RUN:
      return { ...state, running: true };

    case STOP:
      return { ...state, running: false };

    default:
      return state;
  }
}

function percolation(state = {}, action) {
  switch (action.type) {
    case CREATE_DISJOINT_SET:
      const { n } = action.payload;
      return {
        ...state,
        model: new Percolation(n),
      };

    case OPEN_RANDOM:
      while (true) {
        const max = state.model._size - 1;
        const [ row, col ] = [ random(0, max), random(0, max) ];

        if (!state.model.isOpen(row, col)) {
          state.model.open(row, col);
          break;
        }
      }

      return {
        ...state,
        sites: state.model._sites,
      };

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
  percolation,
  stats,
});

function combineReducers(reducers) {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      }, {}
    );
  }
}

export default rootReducer;
