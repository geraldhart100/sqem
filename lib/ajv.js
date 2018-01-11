const Ajv = require('ajv')

const dynamicDefaults = require('ajv-keyword-dynamic-defaults')

const ajv = new Ajv({
  useDefaults: true,
  coerceTypes: true,
  removeAdditional: true
})

dynamicDefaults(ajv)

module.exports = ajv
