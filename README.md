# Site percolation simulation

[DEMO](https://percolation.yetanother.one/)

I model the system as an n-by-n grid of sites. Each site is either blocked (black) or open (white);
open sites are initially empty. A full site is an open site that can be connected to an open site
in the top row via a chain of neighboring (up, down, left, right) open sites.

If there is a full site in the bottom row, then we say that the system percolates.

### Algorithm:

> A disjoint-set (also called a _Union-Find_) data structure is a data structure that keeps track of a set
> of elements partitioned into a number of disjoint (non-overlapping) subsets.

A union-find algorithm is an algorithm that performs two useful operations on such a data structure:
 - **Union**: Join two subsets into a single subset.
 - **Find**: Determine which subset a particular element is in. This can be used for determining if
two elements are in the same subset.

## License

MIT
