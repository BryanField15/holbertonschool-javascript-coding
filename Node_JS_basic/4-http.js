const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holberton School!');
});

const app = server.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = app;
