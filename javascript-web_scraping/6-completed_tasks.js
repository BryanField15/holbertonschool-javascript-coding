#!/usr/bin/node
const url = process.argv[2];
const request = require('request');
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const bodyObj = JSON.parse(body);
  const userComplete = {};
  for (const todo of bodyObj) {
    if (todo.completed === true) {
      const key = todo.userId.toString();
      if (!userComplete[key]) {
        userComplete[key] = 0;
      }
      userComplete[key]++;
    }
  }
  console.log(userComplete);
});
