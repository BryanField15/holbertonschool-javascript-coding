#!/usr/bin/node
const url = process.argv[2];
const request = require('request');
let counter = 0;
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const filmJson = JSON.parse(body);
  const filmObj = filmJson.results;
  //  iterate over the 7 films
  for (const attributename of filmObj) {
    //  access the character list of the film
    // loop over characters
    for (const character of attributename.characters) {
    //  check if the character contains 18
      if (character.indexOf('18') > -1) {
      //  increase the counter if 18 is there
        counter = counter + 1;
      }
    }
  }
  //  return the counter
  console.log(counter);
});
