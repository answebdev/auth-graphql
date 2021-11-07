import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  // Helper method
  onLogoutClick() {
    // Call logout mutation (Note: the actual mutation is in 'mutations/Logout.js' - import it up above)
    // Wire the Logout mutation up to this component all the way down at the bottom of this file:
    //export default graphql(mutation)(graphql(query)(Header))
    // Call the Logout mutation (we're calling an empty object since we're not using query variables):
    this.props.mutate({
      // Update component to show user is no longer logged in:
      // Refresh the component and show Signup and Login buttons.
      // To do this, use 'refetchQueries' helper with the Logout mutation.
      // This will automatically refetch out list of queries after running the Logout mutation
      // (well, we just have one (the CurrentUser query: 'query'), not a list, but we still put this in an array).
      // The header should now automatically update on the screen:
      refetchQueries: [{ query: query }],
    });
  }

  renderButtons() {
    // Destructure:
    const { loading, user } = this.props.data;
    // If query is not yet complete, do not show any buttons yet (we don't know yet if user is authenticated or not,
    // so we don't know yet which set of buttons to show) -
    // so, if query is still loading, return an empty div:
    if (loading) {
      return <div />;
    }

    // If a user exists - if there is a currently authenticated user, show a Logout button
    if (user) {
      // We use an anchor tag to get the exact same styling used in the li's below,
      // not because we want to navigate anywhere (in fact, we do NOT want the user to navigate anywhere when clicking this)
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      // If a user does not exist - if there is not a currently authenticated user, show a Login and Signup button
      return (
        <div>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    // Log the result of our query that we imported
    // to see if the user is authenticated or not:
    // console.log(this.props.data);
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left'>
            Home
          </Link>
          {/* Note: the li's that go inside this ul are up in the 'renderButtons' function above */}
          <ul className='right'>{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
