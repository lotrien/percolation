import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Dot from './Dot';
import Loader from './Loader';

export class Simulator extends Component {
   static getSetStyles = setWidth => ({
    maxWidth: setWidth + 'px',
    minWidth: setWidth + 'px',
  })

  getDisjointSet = (disjointSet, elementSize) => {
    if (!disjointSet.length) {
      return <Loader />;
    }
    return disjointSet.filter(el => el.type !== 'virtual').map(e => {
      return <Dot key={e.key} state={e.state} size={elementSize} />
    });
  }

  render () {
    const { simulator: { elementSize, setWidth }, disjointSet } = this.props;
    const styles = Simulator.getSetStyles(setWidth);

    return (
      <Fragment>
        <div className="col s12 m9">
          <div className="card-panel center">
            <h5 className="card-title">Visualization</h5>
            <div className="card-content">
              <div className="row">
                <div className="set-wrapper" style={styles}>
                  {this.getDisjointSet(disjointSet, elementSize)}
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
  simulator: state.simulator,
  disjointSet: state.disjointSet,
});

export default connect(mapStateToProps, null)(Simulator);
