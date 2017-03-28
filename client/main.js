import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

const history = createBrowserHistory();

window.history = history;
const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/links" component={Link}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'));
});
