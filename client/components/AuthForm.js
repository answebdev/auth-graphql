import React, { Component } from 'react';

// We're going to use component level state here to keep track of the inputs that the user is modifying.
// No other component really needs to use the content of this form beyond the parent of this component,
// which is the LoginForm component.
// So we can use component-level state here in this component (for email and password).
// And as the user updates each individual input, those two pieces of state will be updated.

class AuthForm extends Component {
  // Component-level state
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();

    // Pass in 'email' and 'password' -
    // Because the state object only has 'email' and 'password', and nothing else (see state up above),
    // we can just pass in 'this.state':
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className='row'>
        <form onSubmit={this.onSubmit.bind(this)} className='col s6'>
          <div className='input-field'>
            <input
              placeholder='Email'
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className='input-field'>
            <input
              placeholder='Password'
              type='password'
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          {/* Error message */}
          <div className='errors'>
            {this.props.errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>

          <button className='btn'>Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
