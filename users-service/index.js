const connectToMongo = require('./database/db.js')
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

connectToMongo();

const app = express();

app.use(cors())

app.use(express.json())
app.use('/api/auth', require('./routes/user.routes.js'))

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
