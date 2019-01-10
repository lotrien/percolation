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
      <div className="row stats">
        <div className="col s12">
          <h5>Percolation stats</h5>
          <ul>{Stats.renderStats([])}</ul>
        </div>
      </div>
    )
  }
}
