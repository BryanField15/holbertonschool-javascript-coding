const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      // Split the file content by lines and filter out empty lines and header
      const lines = data.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('firstname'));

      // Calculate the total number of students
      console.log(`Number of students: ${lines.length}`);

      // Parse students' information and count by field
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
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
