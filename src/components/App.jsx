import React, { Fragment } from 'react';

import Controls from './Controls';
import Simulator from './Simulator';

const App = () => (
  <Fragment>
    <nav className="blue darken-2">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">Percolation Simulator</a>
        <ul className="right">
          <li><a href="https://github.com/lotrien/percolation">View on GitHub</a></li>
        </ul>
      </div>
    </nav>
    <div className="row">
      <Controls />
      <Simulator />
    </div>
  </Fragment>
)

export default App;
