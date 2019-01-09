import {
  SET_WIDTH, SET_HEIGHT, RUN, STOP, OPEN_RANDOM, CREATE_SET
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

export const createSet = (width, height) => ({
  type: CREATE_SET,
  payload: {
    width,
    height,
  },
})

export const run = () => ({ type: RUN })
export const stop = () => ({ type: STOP })
export const openRandom = () => ({ type: OPEN_RANDOM })
