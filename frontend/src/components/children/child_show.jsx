import React from 'react';
import { connect } from 'react-redux';

class Child extends React.Component {

  render() {
    let { child } = this.props;

    if (!child) return null;
    
    return(
      <div>
        {this.props.child.name}
      </div>
    )
  }
}

const MSP = (state, ownProps) => {
  return({
    child: state.entities.children[ownProps.match.params.id]
  })
};

export default connect(MSP,null)(Child);