import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

// Remember that all mutations that we write are promises,
// so we return a promise, and it gets resolved after the mutation has completed.
// We can make use of this fact by chaining on a '.catch' at the end to catch and handle any errors (see Login mutation below).

class LoginForm extends Component {
  // Component-level state for error handling, since we just need it in this component, down in the render.
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  // Callback that is sent down to the <AuthForm /> component below.
  // This will get called whenever the form inside of this component is submitted.
  onSubmit({ email, password }) {
    // Call the Login mutation (which we imported) - pass in the query variables as well (as the 'variables' object)
    // These variables (email, password) is what the user is trying to authenticate with.
    this.props
      .mutate({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        // Get an array of all of the error messages that are contained inside of the response object (comes with GraphQL) -
        // map through this array:
        const errors = res.graphQLErrors.map((error) => error.message);
        // Update component-level state (see above) with the new 'errors' array that was defined:
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        {/* This 'onSubmit' property is passed on down to 'AuthForm.js' - it's availabe in AuthForm.js as 'this.props.onSubmit'*/}
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}
export default graphql(mutation)(LoginForm);
