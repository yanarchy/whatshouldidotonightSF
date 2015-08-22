'use strict';

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

/* Components */
var App = require('./components/app').App;
var NotFound = require('./components/notFound').NotFound;

var routes = (
  <Route name="WhatShoudlIDoTonight" path="/" handler={App}>
    <DefaultRoute name="index" handler={Home} />

    <Route name="dashboard" path="dashboard" handler={Dashboard}>
    </Route>

    <NotFoundRoute name="notfound" handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.getElementById('react-mount'));
});

module.exports = routes;
 
