import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dot from './Dot';
import Loader from './Loader';

export class Simulator extends Component {
  static propTypes = {
    elementSize: PropTypes.number,
    setWidth: PropTypes.number,
    percolation: PropTypes.object,
  }

   static getSetStyles = setWidth => ({
    maxWidth: setWidth + 'px',
    minWidth: setWidth + 'px',
  })

  static STATES = { CLOSE: 'close', OPEN: 'open', FULL: 'full' }

  getDisjointSet = (percolation, elementSize) => {
    if (!percolation) {
      return <Loader />;
    }

    let rv = [];
    
    for (let i = 0; i < percolation._size; i++) {
      for (let j = 0; j < percolation._size; j++) {
        const key = i * percolation._size + j;

        let state = Simulator.STATES.CLOSE;

        if (percolation.isFull(i, j)) {
          state = Simulator.STATES.FULL;
        } else if (percolation.isOpen(i, j)) {
          state = Simulator.STATES.OPEN;
        }

        rv.push(<Dot key={key} state={state} size={elementSize} />);
      }
    }

    return rv;
  }

  render () {
    const { elementSize, setWidth, percolation } = this.props;
    const styles = Simulator.getSetStyles(setWidth);

    return (
      <Fragment>
        <div className="col s12 m9">
          <div className="card-panel center">
            <h5 className="card-title">Visualization</h5>
            <div className="card-content">
              <div className="row">
                <div className="set-wrapper" style={styles}>
                  {this.getDisjointSet(percolation.model, elementSize)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  elementSize: state.simulator.elementSize,
  setWidth: state.simulator.setWidth,
  percolation: state.percolation,
});

export default connect(mapStateToProps, null)(Simulator);
