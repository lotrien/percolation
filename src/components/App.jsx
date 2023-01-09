import React, { Fragment, useReducer } from 'react';

import rootReducer from '../store/reducer';
import {
  createDisjointSet,
  run,
  stop,
  openRandom,
  addStats,
} from '../store/actions'
import { INIT_INPUT_STATE } from '../constants';

import Controls from './Controls';
import Simulator from './Simulator';

import '../styles.css'

const App = () => {
  const [ state, dispatch ] = useReducer(rootReducer, {
    simulator: {
      elementSize: 15,
      running: false,
      setWidth: 15 * INIT_INPUT_STATE.n,
    },
    percolation: {},
    stats: []
  });

  // ToDo: consider using useContext to cleanup
  const { stats, percolation, simulator } = state;

  // Controls actions
  const createDisjointSetA = n => dispatch(createDisjointSet(n));
  const runA = () => dispatch(run());
  const stopA = () => dispatch(stop());
  const addStatsA = (n, count) => dispatch(addStats(n, count));
  const openRandomA = () => dispatch(openRandom());

  return (
    <Fragment>
      <nav className="blue darken-2">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Percolation Simulator</a>
          <ul className="right">
            <li><a href="https://github.com/lotrien/percolation">GitHub</a></li>
           </ul>
        </div>
      </nav>
      <div className="row">
        <Controls
          running={simulator.running}
          pModel={percolation.model}
          stats={stats}
          run={runA}
          stop={stopA}
          addStats={addStatsA}
          openRandom={openRandomA}
          createDisjointSet={createDisjointSetA}
        />
        <Simulator
          percolation={percolation}
          elementSize={simulator.elementSize}
          setWidth={simulator.setWidth}
        />
      </div>
     </Fragment>
  );
};

export default App;
