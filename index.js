var express = require('express');
var app = module.exports = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/app'));
app.set('app', __dirname + '/app');

// require('./routes')(app);

app.get('/', function (req, res) {
  response.render('')
});

app.listen(app.get('port'), function() {
  console.log('App listening at http://%s:%s', app.get('port'));
});
