import React, { memo, useRef, useState } from 'react';

import Percolation from '../utils/Percolation';

import Controls from './Controls';
import Simulator from './Simulator';
import Stats from './Stats';

import { random } from '../utils/utils'
import { INIT_INPUT_STATE } from '../constants';

import '../styles.css'

const MemoStats = memo(Stats);

const App = () => {
  const [n, setDimensions] = useState(INIT_INPUT_STATE.n);
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState([]);
  // forced way to trigger rerender for Simulator component so it will see useRef changes
  const [_, setSites] = useState(0);

  const percolationModel = useRef(null);
  const intervalId = useRef(null);

  const openRandom = () => {
    while (true) {
      const max = percolationModel.current._size - 1;
      const [row, col] = [random(0, max), random(0, max)];

      if (!percolationModel.current.isOpen(row, col)) {
        percolationModel.current.open(row, col);

        setSites(oldSites => oldSites + 1);
        break;
      }
    }
  };

  const runSimulation = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    setRunning(true);
    percolationModel.current = new Percolation(n);

    intervalId.current = setInterval(() => {
      openRandom();

      if (percolationModel.current.percolates()) {
        clearInterval(intervalId.current);
        setRunning(false);
        setStats(oldStats => [...oldStats, {
          n,
          count: percolationModel.current._openSites,
          key: oldStats.length + 1,
        }]);
      }
    }, 50);
  };

  const stopSimulation = () => {
    clearInterval(intervalId.current);
    setRunning(false);
  }

  return (
    <>
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
          n={n}
          running={running}
          stopSimulation={stopSimulation}
          runSimulation={runSimulation}
          setDimensions={setDimensions}
        >
          <MemoStats stats={stats} />
        </Controls>
        <Simulator percolation={percolationModel.current} />
      </div>
     </>
  );
};

export default App;
