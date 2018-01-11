import test from 'ava'

import ajv from 'ajv'

import dynamicDefaults from '..'

const env = ajv({ useDefaults: true, unknownFormats: true })

dynamicDefaults(env)

test('defaults', t => {
  const schema = {
    dynamicDefaults: {
      ts: 'timestamp',
      dt: 'datetime',
      d: 'date',
      t: 'time'
    }
  }

  const data = {}

  env.validate(schema, data)

  t.is(typeof data.ts, 'number')
  t.is(typeof data.dt, 'string')
  t.is(typeof data.d, 'string')
  t.is(typeof data.t, 'string')

  const dataWithTS = { ts: 1 }

  env.validate(schema, data)

  t.is(dataWithTS.ts, 1)
})

test('unknown', t => {
  const schema = {
    dynamicDefaults: {
      x: 'xxx'
    }
  }

  const data = {}

  t.throws(() => env.validate(schema, data))
})
