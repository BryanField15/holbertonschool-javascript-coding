#!/usr/bin/node
const url = process.argv[2];
const filePath = process.argv[3];
const request = require('request');
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const fs = require('fs');
  fs.writeFile(filePath, body, (err) => {
    if (err) throw err;
  });
});
