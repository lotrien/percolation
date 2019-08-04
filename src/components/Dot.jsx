import React from 'react';

import { SIMULATOR_COLORS } from '../constants';

const Dot = ({ size, state }) => {
  const styles = getDotStyles(size, state);

  return (
    <span style={styles}></span>
  );
};

const getDotStyles = (size, state) => ({
  float: 'left',
  width: size + 'px',
  height: size + 'px',
  background: SIMULATOR_COLORS[state]
});

export default Dot;
