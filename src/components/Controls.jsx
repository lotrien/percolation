import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setDimensions, createSet, run, stop, openRandom, addStats,
} from '../actions'
import { percolates, isValid } from '../utils';
import Stats from './Stats';

export class Controls extends Component {
  static propTypes = {
    dimensions: PropTypes.object,
    simulator: PropTypes.object,
    set: PropTypes.array,
  }

  setDimensions = n => this.props.setDimensions(n);

  runSimulation = () => {
    const { dimensions: { n } } = this.props;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.props.createSet(n);
    this.props.run();

    let count = 0;
    this.intervalId = setInterval(() => {
      this.props.openRandom();
      count++;

      if (percolates(this.props.set)) {
        clearInterval(this.intervalId);
        this.props.addStats(n, count);
        this.props.stop();
      }
    }, 50);
  }

  stopSimulation = () => {
    clearInterval(this.intervalId);

    this.props.stop();
  }

  resetSimulation = () => {
    const { dimensions: { n } } = this.props;

    this.props.createSet(n);
  }

  render () {
    const {
      dimensions: { n },
      simulator: { running },
      set,
      stats,
    } = this.props;

    return (
      <Fragment>
        <div className="col s12 m3 center">
          <div className="card-panel dimensions">
            <h5 className="card-title">Dimension (n-by-n)</h5>
            <div className="card-content">
              <div className="input-field col s12">
                <input
                  id="dimension"
                  className={`${!isValid(n) ? 'invalid' : ''}`}
                  type="number"
                  value={n}
                  onChange={(e) => this.setDimensions(e.target.value)} />
                <label htmlFor="dimension">Dimension (n)</label>
              </div>
              <div className="">
                <a className="waves-effect waves-light btn blue darken-3"
                  onClick={this.runSimulation}
                  disabled={!n || running}>
                  Run
                </a>
                <a className="waves-effect waves-light btn blue darken-3"
                  onClick={this.stopSimulation}
                  disabled={!running}>
                  Stop
                </a>
                <a className="waves-effect waves-light btn blue darken-3"
                  onClick={this.resetSimulation}
                  disabled={!set.length || running}>
                  Reset
                </a>
              </div>
              <Stats stats={stats} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dimensions: state.dimensions,
  simulator: state.simulator,
  set: state.set,
  stats: state.stats,
});

const mapDispatchToProps = dispatch => ({
  createSet: n => dispatch(createSet(n)),
  setDimensions: n => dispatch(setDimensions(n)),
  run: () => dispatch(run()),
  stop: () => dispatch(stop()),
  addStats: (n, count) => dispatch(addStats(n, count)),
  openRandom: () => dispatch(openRandom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
