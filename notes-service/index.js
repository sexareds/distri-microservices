const connectToMongo = require('./database/db.js')
const express = require('express')
var cors = require('cors')
connectToMongo()
const app = express()
const port = 7070
 
app.use(cors())
 
app.use(express.json())
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
