import {
  SET_DIMENSION, RUN, STOP, OPEN_RANDOM, CREATE_SET, ADD_STATS
} from './constants';

export const setDimensions = n => ({
  type: SET_DIMENSION,
  payload: { n },
})

export const createSet = n => ({
  type: CREATE_SET,
  payload: { n },
})

export const run = () => ({ type: RUN })
export const stop = () => ({ type: STOP })
export const openRandom = () => ({ type: OPEN_RANDOM })

export const addStats = (n, count) => ({
  type: ADD_STATS,
  payload: { n, count }
})
