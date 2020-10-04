
/**
 * Resolves a list of expressions.
 *
 * @param {Object} expressions - A map with all relevant expressions. Keys must be the ID of the expression, value can either be a number or an expression.
 * @param {Object} values - A map with all required values. Keys must be the same keys as in the expressions object.
 * @return {Object} - A map with all resolved values.
 *
 */
const resolve = (expressions, values) => {
  const results = { ...values }

  // Values are null until resolved. If no null values remain, return the output.
  const unresolvedCount = Object.values(results).filter(v => v === null).length
  if (unresolvedCount === 0) {
    return results
  }

  Object.entries(expressions).forEach(([ node_id, expression ]) => {
    if (results[node_id] !== null) {
      return
    }

    if (typeof expression === 'number') {
      results[node_id] = expression
      return
    }

    const leftOperand = results[expression.left_operand]
    const rightOperand = results[expression.right_operand]

    if (leftOperand === null || rightOperand === null) {
      return
    }

    switch (expression.operation) {
      case 'MULTIPLY':
        results[node_id] = leftOperand * rightOperand
        break
      case 'DIVIDE':
        results[node_id] = leftOperand / rightOperand
        break
      case 'ADD':
        results[node_id] = leftOperand + rightOperand
        break
      case 'SUBTRACT':
        results[node_id] = leftOperand - rightOperand
        break
      default:
        break
    }
  })

  const unresolvedResultCount = Object.values(results).filter(v => v === null)

  if (unresolvedCount === unresolvedResultCount) {
    throw new Error('Unable to resolve values')
  }

  return resolve(expressions, results)
}

module.exports = resolve
