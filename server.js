const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const port = 8080;

const options = {
  cert: fs.readFileSync('./sslcert/fullchain.pem'),
  key: fs.readFileSync('./sslcert/privkey.pem')
};

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
https.createServer(options, app).listen(8443);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.use(express.static('public'));

