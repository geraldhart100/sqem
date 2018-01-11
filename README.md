# sqem

Cast data against JSON Schema with [ajv](https://github.com/epoberezkin/ajv)

## Install

```sh
npm install sqem
```

## Usage

```json
{
  "type": "object",
  "dynamicDefaults": {
    "id": "shortid"
  },
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false
}
```

```js
const cast = sqem(schema)

cast({ 
  name: 'Exo',
  age : '40',
  size: 2
})

// > Right { name: 'Exo', age: 40, id: 'f3ytunvu1' }

cast({ size: 2 })

// > Left { code: 422 }
```

## API

#### `cast :: S -> A -> Either E A`

**Params**

- `schema` - JSON Schema
- `input` - Data to validate

## License

MIT
