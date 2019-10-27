import React, { Component, Fragment } from 'react';

import { INIT_INPUT_STATE } from '../constants';
import { isValid } from '../utils/utils';
import Stats from './Stats';

export class Controls extends Component {
  constructor() {
    super();
    this.state = {
      n: INIT_INPUT_STATE.n,
    }
  }

  setDimensions = n => this.setState({ n });

  runSimulation = () => {
    const { n } = this.state;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.props.createDisjointSet(n);
    this.props.run();

    this.intervalId = setInterval(() => {
      this.props.openRandom();

      if (this.props.pModel.percolates()) {
        clearInterval(this.intervalId);
        this.props.addStats(n, this.props.pModel._openSites);
        this.props.stop();
      }
    }, 50);
  };

  stopSimulation = () => {
    clearInterval(this.intervalId);

    this.props.stop();
  };

  resetSimulation = () => {
    const { n } = this.state;

    this.props.createDisjointSet(n);
  };

  render () {
    const { n } = this.state;
    const { running, pModel, stats } = this.props;

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
                  disabled={pModel ? !pModel._sites.length : [] || running}>
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

export default Controls;
