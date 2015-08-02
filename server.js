var express = require('express'),
		http = require('http'),
		routes = require('./routes');

var app = module.exports = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/app'));
app.set('app', __dirname + '/app');

app.get('/', routes.index);

app.listen(app.get('port'), function() {
  console.log('App listening at http://%s:%s', app.get('port'));
});