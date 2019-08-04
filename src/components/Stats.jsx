import React from 'react';

const Stats = ({ stats }) => {
  const renderStats = (stats = []) => {
    if (!stats.length) {
      return <li className="empty-stats">Nothing to see here yet</li>;
    }

    return stats.map(stat => {
      const { n, count, key } = stat;
      return (
        <li key={key}>{n}-by-{n} system percolates with {count} open elements out of {n * n} ({getStat(count, n)})</li>
      )
    })
  }

  return (
    <div className="row stats">
      <div className="col s12">
        <h5>Percolation stats</h5>
        <ul className={`stats-list ${!stats.length ? 'empty' : ''}`}>{renderStats(stats)}</ul>
      </div>
    </div>
  )
}

const getStat = (count, n) => {
  return (count / (n * n)).toFixed(2)
}

export default Stats;
