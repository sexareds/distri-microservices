const connectToMongo = require('./database/db.js')
const express = require('express')
var cors = require('cors')
connectToMongo()
const app = express()
 
app.use(cors())
 
app.use(express.json())
app.use('/api/notes', require('./routes/notes.routes.js'))

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
