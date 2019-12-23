import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: '',
      password2: ''
    };

    this.update = this.update.bind(this);
  };

  update(type) {
    return (e) => {
      e.preventDefault();

      this.setState({
        [type]: e.target.value
      })
    };
  };

  submit(e) {
    e.preventDefault();

    console.log(this.state);
  };

  render() {
    let { fName, lName, email, password, password2 } = this.state;
    return(
      <div className="session-form">
            <input 
              type="text" 
              value={fName} 
              placeholder="First Name"
              onChange={this.update('fName')} 
            />
            <input 
              type="text" 
              value={lName} 
              placeholder="Last Name"
              onChange={this.update('lName')} 
              />
            <input 
              type="text" 
              value={email} 
              placeholder="Email"
              onChange={this.update('email')} 
            />
            <input 
              type="password" 
              value={password}
              placeholder="enter password"
              onChange={this.update('password')} 
            />
            <input 
              type="password" 
              value={password2} 
              placeholder="re-enter password"
              onChange={this.update('password2')} 
            />
          <button onClick={(e) => this.submit(e)}>
            Sign Up
          </button>
      </div>
    )
  };
};

export default SignUp;