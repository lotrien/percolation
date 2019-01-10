import UnionFind from './UnionFind';
import { SIMULATOR_STATES } from '../constants';

export const createSet = n => {
  let set = [];

  set.push({ key: 0, id: 0, state: SIMULATOR_STATES.FILL, type: 'virtual' });

  let key = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      set.push({ key, i, j, id: key, state: SIMULATOR_STATES.CLOSE });
      key++;
    }
  }

  set.push({ key, id: key, state: SIMULATOR_STATES.OPEN, type: 'virtual' });

  return set;
}

export const neighbors = (set, n) => {
  set.filter(element => element.type !== 'virtual').forEach(element => {
    let { i, j } = element;

    element.up = (i === 0);
    element.down = (i === n - 1);
    element.left = (j === 0);
    element.right = (j === n - 1);
    element.neighbors = [];

    if (!element.up) {
      element.neighbors.push(getNeighbor(set, { i, j }, 'up'));
    }
    if (!element.down) {
      element.neighbors.push(getNeighbor(set, { i, j }, 'down'));
    }
    if (!element.left) {
      element.neighbors.push(getNeighbor(set, { i, j }, 'left'));
    }
    if (!element.right) {
      element.neighbors.push(getNeighbor(set, { i, j }, 'right'));
    }
  });

  return set;
}

export const getNeighbor = (set, { i, j }, side) => {
  const sides = {
    up: () => set.find(elem => elem.i === i - 1 && elem.j === j),
    down: () => set.find(elem => elem.i === i + 1 && elem.j === j),
    left: () => set.find(elem => elem.i === i && elem.j === j - 1),
    right: () => set.find(elem => elem.i === i && elem.j === j + 1),
  }

  return sides[side]().key;
}

export const percolates = set => {
  return set[set.length - 1].state === SIMULATOR_STATES.FILL;
}

export const open = (set, el) => {
  const uf = new UnionFind(set);

  el.state = 'open';

  if (el.up) {
    uf.union(el, set[0]);
  } else if (el.down) {
    uf.union(el, set[set.length - 1]);
  }

  set.filter(elem => el.neighbors.includes(elem.key))
    .forEach(neighbor => {
      if (neighbor.state !== SIMULATOR_STATES.CLOSE) {
        uf.union(el, neighbor);
      }
    });

  return set;
}

export const checkPercolationAndFill = set => {
  const uf = new UnionFind(set);

  set.filter(e => e.state === SIMULATOR_STATES.OPEN)
    .forEach(element => {
      if (uf.connected(element, set[0])) {
        element.state = SIMULATOR_STATES.FILL;
        if (element.down) {
          set[set.length - 1].state = SIMULATOR_STATES.FILL;
        }
      }
    });

  return set;
}

export const random = arr => {
  return arr[Math.floor((Math.random() * arr.length))];
}

export const isValid = value => {
  return typeof (value) !== 'undefined' && value !== null && value > 0;
}
