import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

    this.props.login(this.state); 
  };

  render() {
    let { email, password } = this.state;
    return (
      <form 
        className="session-form" 
        onSubmit={(e) => this.submit(e)}
      >
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={this.update('email')}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={this.update('password')}
        />
        <input className="submit-button" type="submit" value="Sign In"/>
      </form>
    )
  };
};

export default Login;