export default class UnionFind {
  constructor(disjointSets) {
    this.disjointSets = disjointSets;
  }

  root(i) {
    while (i !== this.disjointSets[i].id) {
      i = this.disjointSets[i].id;
    }

    return i;
  }

  union(el1, el2) {
    const [ i, j ] = [ this.root(el1.key), this.root(el2.key) ];

    this.disjointSets[i].id = j;
  }

  connected(el1, el2) {
    return this.root(el1.key) === this.root(el2.key);
  }
}
