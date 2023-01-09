import React from 'react';

import Dot from './Dot';
import { SIMULATOR_STATES } from '../constants';

const MemoDot = React.memo(Dot);

const getDisjointSet = (percolation, n) => {
  if (!percolation) {
    return <div>Hit 'Run' with desired dimensions to start simulation</div>;
  }

  let rv = [];

  for (let i = 0; i < percolation._size; i++) {
    for (let j = 0; j < percolation._size; j++) {
      const key = i * percolation._size + j;

      let state = SIMULATOR_STATES.CLOSE;

      if (percolation.isFull(i, j)) {
        state = SIMULATOR_STATES.FULL;
      } else if (percolation.isOpen(i, j)) {
        state = SIMULATOR_STATES.OPEN;
      }

      rv.push(<MemoDot key={key} state={state} />);
    }
  }

  const wrapperStyles = {
    maxWidth: `${n * 15}px`,
    minWidth: `${n * 15}px`,
  };

  return (
    <div className="set-wrapper" style={wrapperStyles}>
      {rv}
    </div>
  )
};

const Simulator = ({ n, percolation }) => {
  return (
    <div className="col s12 m9">
      <div className="card-panel center">
        <h5 className="card-title">Visualization</h5>
        <div className="card-content">
          <div className="row">
            {getDisjointSet(percolation.model, n)}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Simulator;
