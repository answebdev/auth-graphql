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

  render() {
    return (
      <div className='row'>
        <form className='col s6'>
          <div className='input-field'>
            <label>Email</label>
            <input
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className='input-field'>
            <label>Password</label>
            <input
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <button className='btn'>Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
