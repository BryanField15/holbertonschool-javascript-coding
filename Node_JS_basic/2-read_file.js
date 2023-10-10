const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync((path), { encoding: 'utf8' });
  } catch (error) {
    throw new Error('Cannot load database');
  }
  const lines = data.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('firstname'));
  console.log(`Number of students: ${lines.length}`);

  const fields = {};

  for (const line of lines) {
    const [firstname, , , field] = line.split(',');
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(firstname);
  }
  for (const [field, students] of Object.entries(fields)) {
    console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
  }
}

module.exports = countStudents;
