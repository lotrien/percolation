import { combineReducers } from 'redux';

import {
  SET_WIDTH, SET_HEIGHT, RUN, STOP, RESET, OPEN_RANDOM, CREATE_GRID,
  INIT_SIMULATOR_STATE, INIT_INPUT_STATE,
} from './constants';

function simulator(state = INIT_SIMULATOR_STATE, action) {
  switch (action.type) {
    case CREATE_GRID:
      return { ...state, gridWidth: state.elementSize * action.payload.width };

    case RUN:
      return { ...state, running: true };

    case STOP:
      return { ...state, running: false };

    case RESET:
      return { ...state, running: false };

    default:
      return state;
  }

  return state;
}

function inputData(state = INIT_INPUT_STATE, action) {
  switch (action.type) {
    case SET_WIDTH:
      return { ...state, width: action.payload.width };

    case SET_HEIGHT:
      return { ...state, height: action.payload.height };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  simulator,
  inputData,
});

export default rootReducer;
