import React from 'react';
import { connect } from 'react-redux';
import { createChild } from '../../actions/child_actions';

class NewChildForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dob: '',
      sex: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  updateField(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      })
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    let { userId } = this.props;

    this.props.createChild(userId,this.state)
      .then(
        () => this.props.history.push('/')
      );
  }

  formatUTCDate(date) {
    let day = date.getUTCDate();
    let month = (parseInt(date.getUTCMonth()) + 1).toString();
    let year = date.getUTCFullYear();
    let hrs = date.getUTCHours();
    let mins = date.getUTCMinutes();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hrs = hrs < 10 ? '0' + hrs : hrs;
    mins = mins < 10 ? '0' + mins : mins;

    return `${year}-${month}-${day}T${hrs}:${mins}`;
  }

  render() {
    let { name, dob, sex } = this.state;

    return(
      <div className="new-child-form">
        <h1>Create a new child</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>Name:</h3>
          <input 
            type="text"
            value={name}
            placeholder="Enter child's name"
            onChange={this.updateField('name')}
          />
          <h3>Date of Birth:</h3>
          <input 
            type="date"
            value={dob}
            onChange={this.updateField('dob')}
          />
          <h3>Sex:</h3>
          <div className="sex-input" onChange={this.updateField('sex')}>
            <input 
              className="radio-button"
              type="radio" 
              name="sex"
              value="female"
              defaultChecked={sex === 'female'}
            /> 
            <span>Female</span>
            <input 
              className="radio-button"
              type="radio" 
              name="sex"
              value="male"
              defaultChecked={sex === 'male'}
            />
            <span>Male</span>
            <input 
              className="radio-button"
              type="radio" 
              name="sex"
              value="other"
              defaultChecked={sex === 'other'}
            />
            <span>Other</span>
          </div>
          <input className="submit-button" type="submit" value="Add Child"/>
        </form>
      </div>
    )
  }
};

const MSP = state => ({
  userId: state.session.user.id
});

const MDP = dispatch => ({
  createChild: (userId, child) => dispatch(createChild(userId,child))
})

export default connect(MSP,MDP)(NewChildForm);