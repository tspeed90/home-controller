const express = require('express');
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

app.get('/', (req, res) => {
  // res.writeHead(200, 'Content-Type:text/html');
  res.send('<h1>Hello World</h1>');
});

app.use(express.static('public'));

