const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const port = 8080;
const authCode = 'fdasjafluudsadj54qrwqfafda$';


app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

if (fs.existsSync('./sslcert/fullchain.pem', () => {
  const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
  };
  https.createServer(options, app).listen(8443);
}));

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/auth', (req, res) => {
  console.log(req.query);
  const redirectUrl = req.query.redirect_uri;
  const state = req.query.state;
  res.redirect(`${redirectUrl}?code=${authCode}&state=${state}`);
  res.end();
});

app.use(express.static('public'));