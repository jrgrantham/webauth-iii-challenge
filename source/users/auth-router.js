const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./users-models')

router.post('/register', (req, res) => {
  const { username, password, department } = req.body
  const hash = bcrypt.hashSync(password, 10)
  const newUser = {
    username,
    password: hash,
    department,
  }
  Users.add(newUser)
    .then(saved => {
      res.json(saved)
    })
    .catch(error => {
      res.json(error)
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.json({
          message: `Welcome ${user.username}`,
          token: token,
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  }
  const options = {
    expiresIn: '1d'
  }
  const result = jwt.sign(
    payload,
    process.env.SECRET,
    options,
  )
  return result
}

module.exports = router
