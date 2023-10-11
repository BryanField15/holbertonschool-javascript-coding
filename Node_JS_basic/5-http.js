const http = require('http');
const url = require('url');
const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      // Split the file content by lines and filter out empty lines and header
      const lines = data.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('firstname'));

      // Parse students' information and count by field
      const fields = {};

      for (const line of lines) {
        const [firstname, , , field] = line.split(',');

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstname);
      }

      let output = `This is the list of our students\nNumber of students: ${lines.length}\n`;
      for (const [field, students] of Object.entries(fields)) {
        output += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }
      // Return the formatted string
      return output.trim();
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

let studentData = '';

countStudents('./database.csv')
  .then((data) => {
    studentData = data;

    const app = http.createServer((req, res) => {
      const { pathname } = url.parse(req.url);
      if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello Holberton School!');
      }
      if (pathname === '/students') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(studentData);
      } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>Page not found</h1>');
      }
    });

    app.listen(1245, () => {
      console.log('Server listening on port 1245');
    });

    module.exports = app;
  });
