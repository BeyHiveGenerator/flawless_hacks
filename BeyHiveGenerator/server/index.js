var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var axios = require('axios');


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/pos', function (req, res) {
  const stream = fs.createReadStream('./pos.txt', {encoding: 'utf8'});
  stream.on('data', data => {
    header = data.split(/\n/);
    let results = []
    header.forEach((head) => {
      results.push(head.split(','))
    })
    res.send(results)
    stream.destroy();
  });

  stream.on('close', () => {
    console.log('stream done')
  });
});

app.get('/neg', function (req, res) {
  const stream = fs.createReadStream('./neg.txt', {encoding: 'utf8'});
  stream.on('data', data => {
    header = data.split(/\n/);
    let results = []
    header.forEach((head) => {
      results.push(head.split(','))
    })
    res.send(results)
    stream.destroy();
  });

  stream.on('close', () => {
    console.log('stream done')
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
