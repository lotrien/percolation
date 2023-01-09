import React from 'react';

import { SIMULATOR_COLORS } from '../constants';

const Dot = ({ state }) => {
  const styles = getDotStyles(state);

  return (
    <span style={styles} />
  );
};

const getDotStyles = (state) => ({
  float: 'left',
  width: '15px',
  height: '15px',
  background: SIMULATOR_COLORS[state]
});

export default Dot;
