import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  // Callback that is sent down to the <AuthForm /> component below.
  // This will get called whenever the form inside of this component is submitted.
  onSubmit({ email, password }) {
    // Call the Login mutation (which we imported) - pass in the query variables as well (as the 'variables' object)
    // These variables (email, password) is what the user is trying to authenticate with.
    this.props.mutate({
      variables: {
        email,
        password,
      },
      refetchQueries: [{ query }],
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        {/* This 'onSubmit' property is passed on down to 'AuthForm.js' - it's availabe in AuthForm.js as 'this.props.onSubmit'*/}
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}
export default graphql(mutation)(LoginForm);
