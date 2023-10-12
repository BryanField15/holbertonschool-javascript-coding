const http = require('http');
const { readFile } = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('firstname'));

    const fields = {
      CS: [],
      SWE: [],
    };

    for (const line of lines) {
      const [firstname, , , field] = line.split(',');
      if (fields[field]) {
        fields[field].push(firstname);
      }
    }
    let output = `Number of students: ${lines.length}\n`;
    for (const [field, students] of Object.entries(fields)) {
      output += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
    }
    return output.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const hostname = 'localhost';
const port = 1245;
const path = './database.csv';

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const title = 'This is the list of our students\n';
    try {
      const result = await countStudents(path);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(title + result);
    } catch (error) {
      res.writeHead(500, { 'Content-type': 'text/plain' });
      res.end(title + error.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
