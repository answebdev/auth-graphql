import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class Header extends Component {
  render() {
    // Log the result of our query that we imported
    // to see if the user is authenticated or not.
    console.log(this.props.data);
    return <div>Header</div>;
  }
}

export default graphql(query)(Header);
