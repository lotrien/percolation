import UnionFind from './UnionFind';

const STATES = { OPEN: true, CLOSE: false }

export default class Percolation {
  constructor(n) {
    this._size = n;
    this._sites = new Array(n * n).fill(STATES.CLOSE);
    this._uf = new UnionFind(n * n + 2);
    this._ufTop = new UnionFind(n * n + 1);
    this._openSites = 0;
    this._ufVirtualTop = this._sites.length + 1;
    this._ufVirtualBottom = this._sites.length + 2;
  }

  getIndex(row, col) {
    return (row * this._size) + col;
  }

  getSites() {
    return this._sites;
  }

  open(row, col) {
    const index = this.getIndex(row, col);

    this._sites[index] = STATES.OPEN;
    this._openSites++;

    this._connectNeighbours(row, col);
  }

  _connectNeighbours(row, col) {
    const index = this.getIndex(row, col);

    if (row === 0) {
      this._uf.union(index, this._ufVirtualTop);
      this._ufTop.union(index, this._ufVirtualTop);
    } else if (this.isOpen(row - 1, col)) {
      const up = this.getIndex(row - 1, col);

      this._uf.union(index, up);
      this._ufTop.union(index, up);
    }

    if (row === this._size - 1) {
      this._uf.union(index, this._ufVirtualBottom);
    } else if (this.isOpen(row + 1, col)) {
      const down = this.getIndex(row + 1, col);

      this._uf.union(index, down);
      this._ufTop.union(index, down);
    }

    if (col > 0 && this.isOpen(row, col - 1)) {
      const left = this.getIndex(row, col - 1);

      this._uf.union(index, left);
      this._ufTop.union(index, left);
    }

    if (col < this._size - 1 && this.isOpen(row, col + 1)) {
      const right = this.getIndex(row, col + 1);

      this._uf.union(index, right);
      this._ufTop.union(index, right);
    }
  }

  isOpen(row, col) {
    const index = this.getIndex(row, col);
    return this._sites[index] == STATES.OPEN;
  }

  isFull(row, col) {
    const index = this.getIndex(row, col);
    return this._ufTop.connected(index, this._ufVirtualTop);
  }

  numberOfOpenSites() {
    return this._openSites;
  }

  percolates() {
    return this._uf.connected(this._ufVirtualBottom, this._ufVirtualTop);
  }
}
