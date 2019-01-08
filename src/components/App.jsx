import React, { Component, Fragment } from 'react';

import Header from './Header';
import Simulator from './Simulator';

export default class App extends Component {
  render() {
    return (<Fragment>
      <Header />
      <Simulator />
    </Fragment>);
  }
}
