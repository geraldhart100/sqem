const Ajv = require('ajv')

const ajv = new Ajv({
  useDefaults: true,
  coerceTypes: true,
  removeAdditional: true
})

module.exports = ajv
