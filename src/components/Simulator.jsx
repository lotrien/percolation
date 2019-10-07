import React from 'react';

import Dot from './Dot';
import Loader from './Loader';

const getSetStyles = setWidth => ({
  maxWidth: setWidth + 'px',
  minWidth: setWidth + 'px',
})

const STATES = { CLOSE: 'close', OPEN: 'open', FULL: 'full' }

const getDisjointSet = (percolation, elementSize) => {
  if (!percolation) {
    return <Loader />;
  }

  let rv = [];

  for (let i = 0; i < percolation._size; i++) {
    for (let j = 0; j < percolation._size; j++) {
      const key = i * percolation._size + j;

      let state = STATES.CLOSE;

      if (percolation.isFull(i, j)) {
        state = STATES.FULL;
      } else if (percolation.isOpen(i, j)) {
        state = STATES.OPEN;
      }

      rv.push(<Dot key={key} state={state} size={elementSize} />);
    }
  }

  return rv;
}

const Simulator = ({ elementSize, setWidth, percolation }) => {
  const styles = getSetStyles(setWidth);

  return (
    <div className="col s12 m9">
      <div className="card-panel center">
        <h5 className="card-title">Visualization</h5>
        <div className="card-content">
          <div className="row">
            <div className="set-wrapper" style={styles}>
              {getDisjointSet(percolation.model, elementSize)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulator;
