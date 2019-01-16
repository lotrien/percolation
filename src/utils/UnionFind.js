export default class UnionFind {
  constructor(n) {
    this.disjointSet = new Array(n);

    for (let i = 0; i < this.disjointSet.length; i++) {
      this.disjointSet[i] = i;
    }
  }

  _root(i) {
    while (i !== this.disjointSet[i]) {
      i = this.disjointSet[i];
    }
    return i;
  }

  union(i, j) {
    this.disjointSet[this._root(i)] = this._root(j);
  }

  connected(i, j) {
    return this._root(i) === this._root(j);
  }
}
