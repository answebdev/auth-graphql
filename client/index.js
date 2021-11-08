import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

// Note on cookies ('createNetworkInterface'):
// Whereas the GraphiQL tool attaches cookies to a request, GraphQL does NOT attach cookies to a request,
// meaning that it breaks authentication right out of the box
// if you are depending on cookies for handling authentication.
// Because of this, we need to do some configuration for GraphQL to instruct it that it needs to send along cookies with every single request.
// ApolloClient is what actually makes the requests to the backend server.
// So we can customize the way that these requests are being made by specifying another option
// inside of the options object called the 'createNetworkInterface" (needs to be imported up top) (see code below),
// which is a little piece of code inside of the Apollo client that is in charge of making network requests to our backend server.
// So what we can do is to create our own custom 'Network Interface',
// and we're going to tell it that whenever we make a request to the backend,
// to make sure to send some cookies along with the request.
// Then, we'll take that 'Network Interface' and pass it along to this ApolloClient.

// Create a new Network Interface customized for our application
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  // Options property (the important part - the magic line)
  // The 'credentials' key of 'same-origin' means that its making requests to the same origin that the browser is currently on.
  // Basically, it means that its safe to send along cookies with the out-going request.
  // This line is what tells the Apollo Client that it should send along cookies whenever it makes a query to the backend server.
  opts: {
    credentials: 'same-origin',
  },
});

// Then, we pass the 'networkInterface' we created to the Apollo Client below -
// so now, the Apollo Client is no longer using the default network interface, but instead,
// it's going to use our customized one that we created above:
const client = new ApolloClient({
  networkInterface,
  // Every single record that comes in from the backend
  // will have an ID property defined on it
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='/login' component={LoginForm}></Route>
          <Route path='/signup' component={SignupForm}></Route>
          <Route path='/dashboard' component={requireAuth(Dashboard)}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
