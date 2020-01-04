import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { createEvent } from '../../actions/event_actions';

class FeedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateInput(field) {
    return (e) => {
      e.preventDefault();

      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createFeed(this.state);
  }

  render() {
    return(
      <div className="modal-container">
        <form onSubmit={() => this.handleSubmit()}>
          <input type="checkbox"/>
            <span>TEST</span>
        </form>
      </div>
    )
  }
};

const MSP = (state,ownProps) => ({
  userId: state.session.id,
  childId: ownProps.match.params.childId
})

const MDP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createFeed: (feed) => dispatch(createEvent(feed))
});

export default withRouter(connect(MSP,MDP)(FeedForm));