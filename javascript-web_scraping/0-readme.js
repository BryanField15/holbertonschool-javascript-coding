#!/usr/bin/node
const filePath = process.argv[2];
const fs = require('fs');
fs.readFile(filePath, (err, inputD) => {
  if (err) throw err;
  console.log(inputD.toString());
});
