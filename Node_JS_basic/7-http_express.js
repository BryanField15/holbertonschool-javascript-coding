const express = require('express');
const { readFile } = require('fs').promises;

const app = express();
const port = 1245;
const path = process.argv[2];

async function countStudents(filepath) {
  try {
    const data = await readFile(filepath, 'utf8');
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

app.get('/', (req, res) => {
  res.end('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const title = 'This is the list of our students\n';
  try {
    const result = await countStudents(path);
    res.status(200).send(title + result);
  } catch (error) {
    res.status(500).send(title + error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
