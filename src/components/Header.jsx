import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setWidth, setHeight, createSet, run, stop, openRandom
} from '../actions'
import { percolates, isValid } from '../utils';

export class Header extends Component {
  static propTypes = {
    dimensions: PropTypes.object,
    simulator: PropTypes.object,
    set: PropTypes.array,
  }

  setWidth = width => this.props.setWidth(width);
  setHeight = height => this.props.setHeight(height);

  runSimulation = () => {
    const { dimensions: { height, width } } = this.props;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.props.createSet(width, height);
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
    const { dimensions: { height, width } } = this.props;

    this.props.createSet(width, height);
  }

  render () {
    const {
      dimensions: { height, width },
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
        <div className="row">
          <div className="col s12">
            <div className="card-panel dimensions">
              <h5 className="card-title center">Dimensions</h5>
              <div className="card-content">
                <div className="row">
                  <div className="input-field col s12 m6">
                    <input
                      id="cols"
                      className={`${!isValid(width) ? 'invalid' : ''}`}
                      type="number"
                      value={width}
                      onChange={(e) => this.setWidth(e.target.value)} />
                    <label htmlFor="cols">Number of cols</label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input
                      id="rows"
                      className={`${!isValid(height) ? 'invalid' : ''}`}
                      type="number"
                      value={height}
                      onChange={(e) => this.setHeight(e.target.value)} />
                    <label htmlFor="rows">Number of rows</label>
                  </div>
                </div>
                <div className="row">
                  <a className="waves-effect waves-light btn blue darken-3"
                    onClick={this.runSimulation}
                    disabled={(!height || !width) || running}>
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
  createSet: (width, height) => dispatch(createSet(width, height)),
  setHeight: height => dispatch(setHeight(height)),
  setWidth: width => dispatch(setWidth(width)),
  run: () => dispatch(run()),
  stop: () => dispatch(stop()),
  openRandom: () => dispatch(openRandom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
