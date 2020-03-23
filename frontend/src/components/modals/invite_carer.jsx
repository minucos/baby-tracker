import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/ui_actions';

class InviteCarer extends React.Component {
  constructor(props) {
    super(props);

    this.state({
      carerId: ''
    })
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

  }
}

const MSP = state => {
  const childId;
  const userId;

  
}



