require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGOOSE

module.exports = {
  MONGODB_URI,
  PORT
}