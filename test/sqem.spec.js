import test from 'ava'

import sqem from '..'

test('signature', t => {
  t.is(typeof sqem, 'function', 'is function')
  t.is(sqem.length, 2)

  t.is(typeof sqem({}), 'function', 'is curried')
  t.is(sqem({}).length, 1)
})

test('results', t => {
  const cast = sqem({
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' }
    },
    required: [
      'name'
    ],
    additionalProperties: false
  })

  t.true(cast({ name: 'a' }).isRight())

  t.deepEqual(
    cast({ name: 'a' }).right(),
    { name: 'a' }
  )

  t.deepEqual(
    cast({ name: 'a', age: '25' }).right(),
    { name: 'a', age: 25 },
    'coerce types'
  )

  t.deepEqual(
    cast({ name: 'a', color: 'white' }).right(),
    { name: 'a' },
    'remove additional'
  )

  t.true(cast({ age: 25 }).isLeft())

  t.is(
    cast({ age: 25 }).left().code,
    422,
    'http ready errors'
  )
})

test('extra keywords', t => {
  const cast = sqem({
    dynamicDefaults: {
      id: 'shortid',
      dateCreated: 'datetime'
    }
  })

  t.is(
    typeof cast({}).right().id,
    'string'
  )

  t.is(
    typeof cast({}).right().dateCreated,
    'string'
  )
})
