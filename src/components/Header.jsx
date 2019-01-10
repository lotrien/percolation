import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setDimensions, createSet, run, stop, openRandom
} from '../actions'
import { percolates, isValid } from '../utils';

export class Header extends Component {
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

    this.intervalId = setInterval(() => {
      this.props.openRandom();

      if (percolates(this.props.set)) {
        clearInterval(this.intervalId);
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
    } = this.props;

    return (
      <Fragment>
        <nav className="blue darken-2">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">Percolation Simulator</a>
            <ul className="right">
              <li><a href="https://github.com/olha-kurkaiedova/percolation">View on GitHub</a></li>
            </ul>
          </div>
        </nav>
        <div className="row center">
          <div className="col s12">
            <div className="card-panel dimensions">
              <h5 className="card-title">Dimensions (n-by-n)</h5>
              <div className="card-content">
                <div className="row">
                  <div className="input-field col s12 m4 offset-m4">
                    <input
                      id="dimension"
                      className={`${!isValid(n) ? 'invalid' : ''}`}
                      type="number"
                      value={n}
                      onChange={(e) => this.setDimensions(e.target.value)} />
                    <label htmlFor="dimension">Dimension (n)</label>
                  </div>
                </div>
                <div className="row">
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
              </div>
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
});

const mapDispatchToProps = dispatch => ({
  createSet: n => dispatch(createSet(n)),
  setDimensions: n => dispatch(setDimensions(n)),
  run: () => dispatch(run()),
  stop: () => dispatch(stop()),
  openRandom: () => dispatch(openRandom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
