const METHODS = require('./methods')

const metaSchema = {
  type: 'object',
  additionalProperties: {
    type: ['string', 'object'],
    additionalProperties: false,
    required: ['func', 'args'],
    properties: {
      func: { type: 'string' },
      args: { type: 'object' }
    }
  }
}

function compile (schema, parentSchema, it) {
  var funcs = {}

  for (var key in schema) {
    var d = schema[key]
    var func = getMethod(typeof d == 'string' ? d : d.func)
    funcs[key] = func.length ? func(d.args) : func
  }

  return it.opts.useDefaults && !it.compositeRule
          ? assignDefaults
          : () => true

  function assignDefaults(data) {
    for (var prop in schema) {
      if (data[prop] === undefined) {
        data[prop] = funcs[prop]()
      }
    }

    return true
  }
}

function getMethod(d) {
  var def = METHODS[d]
  if (def) return def
  throw new Error('invalid "dynamicDefaults" keyword property value: ' + d)
}

module.exports = ajv => {
  const def = {
    compile,
    metaSchema
  }

  ajv.addKeyword('dynamicDefaults', def)

  return ajv
}
