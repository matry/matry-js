const resolve = require('./index')

test('adds two numbers', () => {
  const expressions = {
    a: 2,
    b: 3,
    c: {
      left_operand: 'a',
      right_operand: 'b',
      operation: 'ADD',
    }
  }

  const values = {
    a: null,
    b: null,
    c: null,
  }

  expect(resolve(expressions, values)).toEqual({
    a: 2,
    b: 3,
    c: 5,
  })
})

test('divides two numbers', () => {
  const expressions = {
    a: {
      left_operand: 'c',
      right_operand: 'b',
      operation: 'DIVIDE',
    },
    b: 4,
    c: 8,
  }

  const values = {
    a: null,
    b: null,
    c: null,
  }

  expect(resolve(expressions, values)).toEqual({
    a: 2,
    b: 4,
    c: 8,
  })
})

test('multiplies two numbers', () => {
  const expressions = {
    a: 10,
    b: {
      left_operand: 'a',
      right_operand: 'c',
      operation: 'MULTIPLY',
    },
    c: 3,
  }

  const values = {
    a: null,
    b: null,
    c: null,
  }

  expect(resolve(expressions, values)).toEqual({
    a: 10,
    b: 30,
    c: 3,
  })
})

test('subtracts two numbers', () => {
  const expressions = {
    a: 3,
    b: 9,
    c: {
      left_operand: 'a',
      right_operand: 'b',
      operation: 'SUBTRACT',
    },
  }

  const values = {
    a: null,
    b: null,
    c: null,
  }

  expect(resolve(expressions, values)).toEqual({
    a: 3,
    b: 9,
    c: -6,
  })
})

test('resolves several numbers', () => {
  const expressions = {
    a: 3,
    b: 10,
    c: {
      left_operand: 'a',
      right_operand: 'b',
      operation: 'ADD',
    },
    d: {
      left_operand: 'a',
      right_operand: 'c',
      operation: 'MULTIPLY',
    },
    e: {
      left_operand: 'd',
      right_operand: 'c',
      operation: 'SUBTRACT'
    },
  }

  const values = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
  }

  const results = resolve(expressions, values)

  expect(results).toEqual({
    a: 3,
    b: 10,
    c: 13,
    d: 39,
    e: 26,
  })
})
