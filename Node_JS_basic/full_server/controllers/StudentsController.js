import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const data = await readDatabase();
      let output = 'This is the list of our students\n';

      const sortedFields = Object.keys(data)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      for (const field of sortedFields) {
        output += `Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}\n`;
      }
      return res.status(200).send(output.trim());
    } catch (error) {
      return res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const data = await readDatabase();

      if (!data[major]) {
        return res.status(500).send(`No students found for ${major}`);
      }

      const output = `List: ${data[major].join(', ')}`;
      return res.status(200).send(output);
    } catch (error) {
      return res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
