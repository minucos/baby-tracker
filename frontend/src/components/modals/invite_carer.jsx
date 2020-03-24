import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/ui_actions';
import { searchUsers, clearUsers } from '../../actions/users_actions';
import { addCarer } from '../../actions/child_actions';
import { selectCarers } from '../../reducers/selectors';

class InviteCarer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carerId: '',
      searchTerm: '',
      carerName: ''
    };

    this.submit = this.submit.bind(this);
    this.search = this.search.bind(this);
    this.updateCarer = this.updateCarer.bind(this);
  }

  users() {
    let { users, carers } = this.props

    return Object.values(users)
      .filter(user => !carers[user._id])
      .map(user => (
      <li 
        key={user._id}
        onClick={this.updateCarer}
        data-value={user._id}
      >{user.fName} {user.lName}
      </li>
      ))
  }

  search(e) {
    this.setState(
      { searchTerm: e.target.value},
      () => {
        const { searchTerm } = this.state;

        if (searchTerm === '') {
          this.props.clearUsers();
        } else {
          this.props.searchUsers(searchTerm);
        }
      }
    )
  }

  updateCarer(e) {
    e.stopPropagation();
    const carerId = e.currentTarget.dataset['value'];
    const carer = this.props.users[carerId];
    this.setState(
      {
      carerId: carerId,
      carerName: `${carer.fName} ${carer.lName}`,
      searchTerm: ''
      },
      () => this.props.clearUsers()
    )
  }

  submit(e) {
    e.preventDefault();
    let { userId, childId, addCarer, closeModal } = this.props;

    addCarer(userId, childId, this.state.carerId)
      .then(() => closeModal());
  }

  render() {
    let { closeModal, carers, users } = this.props;
    let { carerId, searchTerm, carerName } = this.state;

    return(
      <div className="modal-container" onClick={closeModal}>
        <div className='invite-form' onClick={(e) => e.stopPropagation()}>
          <h1>Add a new carer</h1>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={this.search}
            placeholder="enter carer details"
          />
          <ul>
            {this.users()}
          </ul>
          <form onSubmit={this.submit}>
            <input className="submit-button" type="submit" value="Add Carer"/>
          </form>
          <div className="selected-carer">
            <div>selected carer:</div>
            <div>
              {carerName}
            </div>
          </div>
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
    carers: selectCarers(child.carers),
    users: state.entities.users,
    childId,
    userId,
    child
  })
};

const MDP = dispatch => ({
  searchUsers: searchTerm => dispatch(searchUsers(searchTerm)),
  clearUsers: () => dispatch(clearUsers()),
  addCarer: (userId,childId,carerId) => dispatch(addCarer(userId,childId,carerId)),
  closeModal: () => dispatch(closeModal())
});

export default connect(MSP,MDP)(InviteCarer);



