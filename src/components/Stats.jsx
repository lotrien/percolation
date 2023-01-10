import React from 'react';

const getStat = (count, n) => (count / (n * n)).toFixed(2);

const Stats = ({ stats }) => {
  if (stats.length < 1) return null;

  return (
    <div className="row stats">
      <div className="col s12">
        <h5>Percolation stats</h5>
        <ul className={`stats-list ${!stats.length ? 'empty' : ''}`}>
          {stats.map(({ n, count, key }) => (
            <li key={key}>{n}-by-{n} system percolates with {count} open elements out of {n * n} ({getStat(count, n)})</li>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default Stats;
