const { tokenizer, parser, transpile } = require('./compiler.js');

const program = 'mul 3 sub 2 sum 1 3 4';
console.log('input:', program);
const output = transpile(parser(tokenizer(program))); // (3 * (2 - (1 + 3 + 4)))
console.log('output:', output);