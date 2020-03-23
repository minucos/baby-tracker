import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/ui_actions';
import { searchUsers } from '../../actions/users_actions';
import { addCarer } from '../../actions/child_actions';

class InviteCarer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carerId: ''
    };
  }

  updateCarer(e) {
    e.stopPropagation();

    this.setState({
      carerId: e.currentTarget.dataset['value']
    })
  }

  submit(e) {
    e.preventDefault();
    let { userId, childId, addCarer } = this.props;
    
    addCarer(userId, childId, this.state.carerId);
  }

  render() {
    let { closeModal } = this.props;

    return(
      <div className="modal-container" onClick={closeModal}>
        <div className='form'>
          <h1>form here</h1>
        </div>
      </div>
    )
  }
}

const MSP = state => {
  const childId = state.ui.selectedChild;
  const userId = state.session.user.id;
  const child = state.entities.children[childId];

  return({
    carers: child.carers,
    childId,
    userId,
    child
  })
};

const MDP = dispatch => ({
  searchUsers: searchTerm => dispatch(searchUsers(searchTerm)),
  addCarer: () => dispatch(addCarer()),
  closeModal: () => dispatch(closeModal())
});

export default connect(MSP,MDP)(InviteCarer);



