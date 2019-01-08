export default class UnionFind {
  constructor(grid) {
    this.grid = grid;
  }

  root(i) {
    return i;
  }

  union(i, y) {
    return null;
  }

  find(i, y) {
    return this.root(i) === this.root(y);
  }
}
