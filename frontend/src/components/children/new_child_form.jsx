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
  }

  updateField(field) {
    return (e) => {
      e.preventDefault();
      let value = e.target.value;

      if (field === 'foodFrom' && value !== this.state.foodFrom) {
        this.setState({
          [field]: value,
          startingSide: 'n/a',
          foodType: ''
        })
      } else {
        this.setState({
          [field]: value
        })
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    let { userId, childId } = this.props;
    let feed = this.state;
    feed.fedBy = feed.fedBy.id;

    feed.startDate = this.formatUTCDate(new Date(feed.startDate));
    feed.endDate = this.formatUTCDate(new Date(feed.endDate));

    console.log(feed.startTime)
    this.props.createFeed(userId, childId, feed)
      .then(
        () => this.props.closeModal(),
      );
  }

  formatLocalDate(date) {
    let day = date.getDate();
    let month = (parseInt(date.getMonth()) + 1).toString();
    let year = date.getFullYear();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hrs = hrs < 10 ? '0' + hrs : hrs;
    mins = mins < 10 ? '0' + mins : mins;

    return `${year}-${month}-${day}T${hrs}:${mins}`;
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
        <form onSubmit={(e) => this.submit(e)}>
          <h3>Name:</h3>
          <input 
            type="text"
            value={name}
            placeholder="Enter child's name"
            onChange={this.updateField('name')}
          />
          <h3>Date of Birth:</h3>
          <input 
            type="datetime-local"
            value={dob}
            onChange={this.updateField('dob')}
          />
          <h3>Sex:</h3>
          <div className="sex-input">
            <input 
              className="radio-button"
              type="radio" 
              name="sex"
              value="female"
            /> 
            <span>Female</span>
            <input 
              className="radio-button"
              type="radio" 
              name="sex"
              value="male"
            />
            <span>Male</span>
            <input 
              className="radio-button"
              type="radio" 
              name="sex"
              value="other"
            />
            <span>Other</span>
          </div>
          <input className="submit-button" type="submit" value="Add Child"/>
        </form>
      </div>
    )
  }
};

export default connect(null,null)(NewChildForm);