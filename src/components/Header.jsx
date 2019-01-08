import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setWidth, setHeight, createGrid, run, stop, reset, openRandom
} from '../actions'

export class Header extends Component {
  static propTypes = {
    inputData: PropTypes.object,
    simulator: PropTypes.object,
  }

  componentDidMount() {
    const { height, width } = this.props.inputData;

    this.props.createGrid(height, width);
  }

  setWidth = width => this.props.setWidth(width);

  setHeight = height => this.props.setHeight(height);

  runSimulation = () => {
    const { stop, run, createGrid } = this.props;
    const { height, width } = this.props.inputData;

    createGrid(height, width);
    run();
  }

  stopSimulation = () => this.props.stop();

  resetSimulation = () => {
    const { height, width } = this.props.inputData;

    this.props.reset(width, height);
  }

  render () {
    const { height, width } = this.props.inputData;

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
            <div className="card-panel">
              <div className="row">
                <div className="input-field col s12 m6">
                  <input
                    id="rows"
                    type="number"
                    value={height}
                    onChange={(e) => this.setHeight(e.target.value)} />
                  <label htmlFor="rows">Number of rows</label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                    id="cols"
                    type="number"
                    value={width}
                    onChange={(e) => this.setWidth(e.target.value)} />
                  <label htmlFor="cols">Number of cols</label>
                </div>
              </div>
              <div className="row">
                <a className="waves-effect waves-light btn blue darken-3" onClick={this.runSimulation}>Run</a>
                <a className="waves-effect waves-light btn blue darken-3" onClick={this.stopSimulation}>Stop</a>
                <a className="waves-effect waves-light btn blue darken-3" onClick={this.resetSimulation}>Reset</a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { simulator, inputData } = state;
  return { simulator, inputData };
}

const mapDispatchToProps = dispatch => ({
  createGrid: (width, height) => dispatch(createGrid(width, height)),
  setHeight: height => dispatch(setHeight(height)),
  setWidth: width => dispatch(setWidth(width)),
  run: () => dispatch(run()),
  stop: () => dispatch(stop()),
  reset: (width, height) => dispatch(reset(width, height)),
  openRandom: () => dispatch(openRandom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
