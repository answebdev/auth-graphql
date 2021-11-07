import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
  // Component-level state for error handling:
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  // Callback function - this is passed down into the AuthForm down below
  onSubmit({ email, password }) {
    // Call mutation and pass in email and password as query variables
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        // Update component-level state:
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(mutation)(SignupForm);
