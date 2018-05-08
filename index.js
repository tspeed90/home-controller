const server = require('./server');

const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect(8080);
  console.log(url);
})();


