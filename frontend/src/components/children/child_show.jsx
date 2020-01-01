import React from 'react';
import { connect } from 'react-redux';
import { fetchChild } from '../../actions/child_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

class Child extends React.Component {

  componentDidMount() {
    let { userId,childId } = this.props;
    this.props.fetchChild(userId,childId);
  }

  calcAge() {
    let { child } = this.props;
    let diff = ((Date.now() - new Date(child.dob)) / 86400000 / 365).toFixed(1);

    if (diff < 1) {
      return `${Math.round(12 * diff)} months`;
    }

    return `${diff} years`;
  }

  render() {
    let { child, userId } = this.props;

    if (!child) return null;

    let carers = child.carers.map(carer => {
      if (carer._id !== userId) {
        return(
          <li key={carer._id}>{carer.fName} {carer.lName}</li>
        )
      }
    })
    
    return(
      <div className="child-show">
        <div className="profile-pic">
          <FontAwesomeIcon icon={faBaby} />
        </div>
        <div>{child.name}</div>
        <div>{this.calcAge()}</div>
        <ul>Other Carers:
          {carers}
        </ul>
      </div>
    )
  }
}

const MSP = (state, ownProps) => {
  let childId = ownProps.match.params.id;
  return({
    child: state.entities.children[childId],
    userId: state.session.user.id,
    childId
  })
};

const MDP = dispatch => ({
  fetchChild: (userId,childId) => dispatch(fetchChild(userId,childId))
})

export default connect(MSP,MDP)(Child);