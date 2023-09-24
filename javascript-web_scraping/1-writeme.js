#!/usr/bin/node
const filePath = process.argv[2];
const fileContent = process.argv[3];
const fs = require('fs');
fs.writeFile(filePath, fileContent, (err) => {
  if (err) throw err;
});
