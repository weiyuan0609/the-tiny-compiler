/**
 * the super tiny compiler
 * mul 2 sub 5 sum 1 2 3
 * => mul(2, sub(5, sum(1, 2, 3)))
 * => 2 * (5 - (1 + 2 + 3))
 */
const Op = Symbol('op');
const Num = Symbol('num');

/**
 * 词法分析
 */
const tokenizer = input => {
  const lex = input => input.split(' ').map(str => str.trim()).filter(str => str.length);
  return lex(input);
}

/**
 * 语法分析
 * digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
 * num = digit+
 * op = sum | sub | mul | div
 * expr = num | op expr+
 */
const parser = tokens => {
  let c = 0;

  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const parseNum = () => ({ val: parseInt(consume()), type: Num });

  const parseOp = () => {
    const node = { val: consume(), type: Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };

  const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();

  return parseExpr();
}

/**
 * 编译器
 */
const transpile = ast => {
  const opMap = { sum: '+', mul: '*', sub: '-', div: '/' };
  const transpileNode = ast => ast.type === Num ? transpileNum(ast) : transpileOp(ast);
  const transpileNum = ast => ast.val;
  const transpileOp = ast => `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
  return transpileNode(ast);
};

module.exports = {
  tokenizer: tokenizer,
  parser: parser,
  transpile: transpile
}
