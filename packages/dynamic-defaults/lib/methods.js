const shortid = require('yiwn-shortid')

const timestamp = () => Date.now()

const datetime = () => (new Date).toISOString()
const date = () => datetime().slice(0, 10)
const time = () => datetime().slice(11)

module.exports = {
  timestamp,
  datetime,
  date,
  time,
  shortid
}
