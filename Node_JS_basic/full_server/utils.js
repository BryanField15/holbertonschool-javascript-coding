import fs from 'fs/promises';

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('firstname'));

    const fields = {};

    for (const line of lines) {
      const [firstname, , , field] = line.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    }

    return fields;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

export default readDatabase;
