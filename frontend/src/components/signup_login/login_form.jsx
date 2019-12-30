import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.update = this.update.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  };


  componentDidMount() {
    this.function = (e) => this.handleEnter(e);
    this.listener = document.addEventListener('keypress', this.function);
  }

  componentWillUnmount() {
    document.removeEventListener(this.listener, this.function);
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      this.submit(e)
    }
  }

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
      <div className="session-form">
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
        <button onClick={(e) => this.submit(e)}>
          Sign In
        </button>
      </div>
    )
  };
};

export default Login;