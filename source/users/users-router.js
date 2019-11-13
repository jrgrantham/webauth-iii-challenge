const router = require('express').Router()

const Users = require('./users-models')
const restricted = require('./restricted-middleware')

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      res.send(error)
    })
})

module.exports = router