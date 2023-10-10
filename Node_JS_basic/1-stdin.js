process.stdin.setEncoding('utf8');

console.log('Welcome to Holberton School, what is your name?');
process.stdin.on('data', (input) => {
  const name = input.trim();
  console.log(`Your name is: ${name}`);
  console.log('This important software is now closing');
  process.exit();
});
process.stdin.on('end', () => {
  console.log('This important software is now closing');
  process.exit();
});
