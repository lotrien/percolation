import React from 'react';

import { isValid } from '../utils/utils'

export default function Controls({
  children,
  n,
  running,
  setDimensions,
  runSimulation,
  stopSimulation,
}) {
  return (
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
              onChange={(e) => setDimensions(Number(e.target.value))} />
            <label htmlFor="dimension">Dimension (n)</label>
          </div>
          <div className="">
            <a className="waves-effect waves-light btn blue darken-3"
              onClick={runSimulation}
              disabled={!n || running}>
              Run
            </a>
            <a className="waves-effect waves-light btn blue darken-3"
              onClick={stopSimulation}
              disabled={!running}>
              Stop
            </a>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
