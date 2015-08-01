var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.set('public', __dirname + '/public');

app.get('/', function (req, res) {
  response.render('index.html')
});

app.listen(app.get('port'), function() {
  console.log('App listening at http://%s:%s', app.get('port'));
});