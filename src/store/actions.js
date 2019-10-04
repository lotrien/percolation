import {
  RUN, STOP, OPEN_RANDOM, CREATE_DISJOINT_SET, ADD_STATS
} from './actionTypes';

export const createDisjointSet = n => ({
  type: CREATE_DISJOINT_SET,
  payload: { n },
})

export const run = () => ({ type: RUN })
export const stop = () => ({ type: STOP })
export const openRandom = () => ({ type: OPEN_RANDOM })

export const addStats = (n, count) => ({
  type: ADD_STATS,
  payload: { n, count }
})
