import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';

class SignupForm extends Component {
  // Callback function - this is passed down into the AuthForm down below
  onSubmit({ email, password }) {
    // Call mutation and pass in email and password as query variables
    this.props.mutate({
      variables: { email, password },
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm errors={[]} onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(mutation)(SignupForm);
