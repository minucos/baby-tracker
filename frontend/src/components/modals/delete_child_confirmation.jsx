import React from 'react';
import { connect } from 'react-redux';
import { deleteChild, fetchChildren } from '../../actions/child_actions';
import { closeModal } from '../../actions/ui_actions';


class DeleteChildConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }

    this.submit = this.submit.bind(this);
  }

  update(e) {
    e.preventDefault();

    this.setState({
      name: e.currentTarget.value
    })
  }
  submit(e) {
    e.preventDefault();
    let { deleteChild, userId, childId, closeModal, fetchChildren } = this.props;

    deleteChild(userId, childId)
    closeModal();
  }

  render() {
    let { closeModal, child } = this.props;
    let { name } = this.state;

    return (
      <div className="modal-container" onClick={closeModal}>
        <form className="form" onClick={(e) => e.stopPropagation()} onSubmit={this.submit}>
          <h1 className="modal-h1">Warning: This action cannot be ondone!</h1>
          <h3>Enter child's name below to confirm</h3>
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={(e) => this.update(e) }
            />
            <input 
              className="delete-button"
              type="submit" 
              value="Remove Child"
              disabled={name.toLowerCase() !== child.name.toLowerCase()}
            />
        </form>
      </div>
    )
  }
};

const MSP = state => {
  const childId = state.ui.selectedChild;

  return({
    userId: state.session.user.id,
    child: state.entities.children[childId],
    childId
  })
}

const MDP = dispatch => ({
  deleteChild: (userId, childId) => dispatch(deleteChild(userId, childId)),
  closeModal: () => dispatch(closeModal())
});

export default connect(MSP, MDP)(DeleteChildConfirmation);