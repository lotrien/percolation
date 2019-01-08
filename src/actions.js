import {
  SET_WIDTH, SET_HEIGHT, RUN, STOP, RESET, OPEN_RANDOM, CREATE_GRID,
} from './constants';

export const setWidth = width => ({
  type: SET_WIDTH,
  payload: {
    width,
  },
})

export const setHeight = height => ({
  type: SET_HEIGHT,
  payload: {
    height,
  },
})

export const createGrid = (width, height) => ({
  type: CREATE_GRID,
  payload: {
    width,
    height,
  },
})

export const run = () => ({ type: RUN })
export const stop = () => ({ type: STOP })
export const reset = (width, height) => ({
  type: RESET,
  payload: {
    width,
    height,
  },
})
export const openRandom = () => ({ type: OPEN_RANDOM })
