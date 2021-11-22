const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const { errorHandler } = require('./middlewares/errorHandler')

const AccountRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuswire'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const path = require('path');

app.use(express.static('dist'))

app.use(express.json())
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 360000,
}))

app.use('/account', AccountRouter)
app.use('/api/questions', QuestionRouter)
app.use(errorHandler)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
