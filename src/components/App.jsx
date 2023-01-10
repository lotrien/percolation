import React, { Fragment, useReducer, memo } from 'react';

import rootReducer from '../store/reducer';
import * as actions from '../store/actions'

import Controls from './Controls';
import Simulator from './Simulator';
import Stats from './Stats';

import '../styles.css'

const MemoStats = memo(Stats);

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, {
    simulator: {
      running: false,
    },
    percolation: {},
    stats: []
  });

  // ToDo: consider using useContext to cleanup
  const { stats, percolation, simulator } = state;

  const createDisjointSet = n => dispatch(actions.createDisjointSet(n));
  const run = () => dispatch(actions.run());
  const stop = () => dispatch(actions.stop());
  const addStats = (n, count) => dispatch(actions.addStats(n, count));
  const openRandom = () => dispatch(actions.openRandom());

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
          run={run}
          stop={stop}
          addStats={addStats}
          openRandom={openRandom}
          createDisjointSet={createDisjointSet}
        >
          <MemoStats stats={stats} />
        </Controls>
        <Simulator percolation={percolation} n={simulator.n} />
      </div>
     </Fragment>
  );
};

export default App;
