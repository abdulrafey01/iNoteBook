const express = require('express')
var cors = require('cors')


const connectToMongoose = require('./db')

// No 2: Connect to database
connectToMongoose()

// No 3: Run an express app
const app = express()
const port = 5000

// To Client With Client - Error aya tha
app.use(cors())

app.listen(port, () => {
  console.log(`Backend iNoteBook App listening on port ${port}`)
})
app.get('/', (req, res) => {
  res.send('Hello Harry!')
})




//No 4: Do that Because Endpoint are going to pass jsos=n
app.use(express.json())
 
//No 5. Define authentication and notes route/api
app.use('/api/auth/', require('./routes/auth'))


app.use('/api/notes/', require('./routes/notes'))

