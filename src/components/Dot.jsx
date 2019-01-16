import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SIMULATOR_COLORS } from '../constants';

export default class Dot extends Component {
  static propTypes = {
    state: PropTypes.string,
    size: PropTypes.number,
  }

  static getDotStyles = (size, state) => ({
    float: 'left',
    width: size + 'px',
    height: size + 'px',
    background: SIMULATOR_COLORS[state]
  })

  render() {
    const { size, state } = this.props;
    const styles = Dot.getDotStyles(size, state);

    return (
      <span style={styles}></span>
    );
  }
}
