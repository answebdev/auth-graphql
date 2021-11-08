import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import CurrentUser from '../queries/CurrentUser';

// The reason for this Higher Order Component (HOC) is to see whether or not the user is currently authenticated.
// If the user is NOT authenticated, then we want to redirect the user to the Login route.

class RequireAuth extends Component {
  // Whenever this component has been rendered,
  // we want to check whether or not the user is currently signed in.
  // To do this, we run the CurrentUser query -
  // if that user exists, that means the user must be signed in.
  // If that property does not exist, that means the user is NOT signed in (authenticated),
  // and we need to redirect the user somewhere else in our application.
  componentDidMount() {
    // If the user does not exist yet
    // Also if the query is still loading, we don't know if the user exists yet,
    // and so we wouldn't want to prematurely redirect the user over to the Login page,
    // so we also need to include: !this.props.data.loading =>
    // so if it's not loading anymore (if we're done loading the query), and there is no user present,
    // then redirect the user to the Login page:
    if (!this.props.data.loading && !this.props.data.user) {
      // then redirect the user back to the Login page
      hashHistory.push('/login');
    }
  }
}

graphql(CurrentUser)(RequireAuth);