import React, { Component } from 'react';
import { hashHistory } from 'react-router';
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

  componentWillUpdate(nextProps) {
    // Compare current set of props with the previous set of props.
    // If there was not a user currently, but there will be, chances are the user just logged in.
    // If the incoming set of props has a user, and the previous set of props did not have a user,
    // the user must have just logged in, so redirect the user to the dashboard page:
    if (nextProps.data.user && !this.props.data.user) {
      // Redirect to dashboard - do a forceful redirect:
      hashHistory.push('/dashboard');
    }
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

export default graphql(query)(graphql(mutation)(SignupForm));
