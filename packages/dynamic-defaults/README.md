# ajv-keyword-dynamic-defaults

Partial implementation of [ajv-keywords](https://github.com/epoberezkin/ajv-keywords)

## Install

```sh
npm install ajv-keyword-dynamic-defaults
```

## Example

```js
const schema = {
  type: 'object',
  dynamicDefaults: {
    ts: 'datetime'
  },
  properties: {
    ts: {
      type: 'string',
      format: 'datetime'
    }
  }
}

const data = {}
ajv.validate(data) // true
data // { ts: '2016-12-01T22:07:28.829Z' }

const data1 = {}
ajv.validate(data1) // true
data1 // { ts: '2016-12-01T22:07:29.832Z' }

ajv.validate(data1) // true
data1 // didn't change, as all properties were defined
```

## Methods

- `"timestamp"` - current timestamp in milliseconds
- `"datetime"` - current date and time as string (ISO, valid according to date-time format)
- `"date"` - current date as string (ISO, valid according to date format)
- `"time"` - current time as string (ISO, valid according to time format)
- `"shortid"` - unique random string
