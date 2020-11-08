require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}