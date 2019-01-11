export default class UnionFind {
  constructor(disjointSets) {
    this.disjointSets = disjointSets;
  }

  _root(i) {
    while (i !== this.disjointSets[i].id) {
      i = this.disjointSets[i].id;
    }

    return i;
  }

  union(el1, el2) {
    const [ i, j ] = [ this._root(el1.key), this._root(el2.key) ];

    this.disjointSets[i].id = j;
  }

  connected(el1, el2) {
    return this._root(el1.key) === this._root(el2.key);
  }
}
