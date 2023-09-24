#!/usr/bin/node
const episodeNum = process.argv[2];
const request = require('request');
request(`https://swapi-api.hbtn.io/api/films/${episodeNum}`, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const filmJson = JSON.parse(body);
  console.log(filmJson.title);
});
