import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class Header extends Component {
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
      return <div>Logout</div>;
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

export default graphql(query)(Header);
