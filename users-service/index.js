const connectToMongo = require('./database/db.js')
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

connectToMongo()

const app = express()
const port = 8080
 
app.use(cors())
 
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
