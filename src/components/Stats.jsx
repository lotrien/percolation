import React, { Component, Fragment } from 'react';

export default class Stats extends Component {
  static renderStats = stats => {
    if (!stats.length) {
      return <li className="empty-stats">Nothing to see here yet</li>;
    }

    return stats.map(stat => <li>{stat}</li>)
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h5 className="card-title center">Percolation stats</h5>
            <ul className="card-content center">
              {Stats.renderStats([])}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
