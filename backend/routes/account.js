const express = require('express')

const router = express.Router()

const User = require('../models/user')

// brew services start mongodb/brew/mongodb-community
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    res.send(`User ${username} Created!`)
  } catch (err) {
    next(new Error(err))
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send(`User ${username} does not exist!`)
    }

    const passDB = user.password
    if (password === passDB) {
      req.session.username = username
      req.session.password = password
      res.send(`User ${username} has been logged in!`)
    } else {
      res.send(`User ${username} credentials were incorrect`)
    }
  } catch (err) {
    next(new Error(err))
  }
})

router.post('/logout', async (req, res) => {
  const { username } = req.session
  req.session.username = null
  req.session.password = null
  res.send(`User ${username} has been logged out`)
})

module.exports = router
