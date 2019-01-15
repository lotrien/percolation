import React, { Component, Fragment } from 'react';

export default class Stats extends Component {
  static renderStats = (stats = []) => {
    if (!stats.length) {
      return <li className="empty-stats">Nothing to see here yet</li>;
    }

    return stats.map(stat => {
      const { n, count, key } = stat;
      return (
        <li key={key}>{n}-by-{n} system percolates with {count} open elements ({(count / (n * n)).toFixed(2)})</li>
      )
    })
  }

  render() {
    const { stats } = this.props;
    return (
      <div className="row stats">
        <div className="col s12">
          <h5>Percolation stats</h5>
          <ul className={`stats-list ${!stats.length ? 'empty' : ''}`}>{Stats.renderStats(stats)}</ul>
        </div>
      </div>
    )
  }
}
