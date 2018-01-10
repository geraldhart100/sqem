const {
  assoc,
  compose,
  curry,
  clone,
  head,
  propOr
} = require('ramda')

const {
  Left,
  Right
} = require('monet')

/**
 * Local Ajv
 */

const ajv = require('./ajv')

/**
 * @sig
 *
 * leftFrom :: M -> Either E A
 */

const leftFrom = compose(
  Left,
  assoc('code', 422),
  head,
  propOr([], 'errors')
)

/**
 * @sig
 *
 * rightFrom :: A -> Either E A
 */

const rightFrom = Right

/**
 * @sig
 *
 * sqem :: S -> A -> Either E A
 *
 * @description
 *
 * Cast `data` against provided JSON Schema
 *
 */

const sqem = curry(
  function (schema, input) {
    const data = clone(input)
    const ok = ajv.validate(schema, data)
    return ok
      ? rightFrom(data)
      : leftFrom(ajv)
  }
)


module.exports = sqem
