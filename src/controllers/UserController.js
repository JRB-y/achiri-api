const db = require('../db')
const User = require('../models/User')
const Handler = require('../utils/Handler')
const check_no_empty = require('../utils/inputs/check_no_empty')

/**
 * List of all users
 * 
 * @method GET
 * @param id Number
 * @param data json
 */
exports.index = async (req, res) => {

  let [users, error] = await Handler(User.findAll())

  if (error) return res.status(500).json({ error })

  return res.status(200).json(users)
};

/**
 * get: Show User
 * 
 * @method GET
 * @param id Number
 */
exports.show = async function (req, res) {
  const id = req.params.id;

  let [user, error] = await Handler(User.findByPk(id))

  if (error) return res.status(500).json(error)

  return res.status(200).json(user)
}

/**
 * Store a new user POST: post
 * 
 * @method POST
 * @param data json
 */
exports.store = async function (req, res) {
  const { name, email, password } = req.body

  const errors = check_no_empty({ name, email, password })

  if (errors) return res.status(409).json(errors)

  // action
  const [user, error] = await Handler(User.create({ name, email, password }))

  // checking server errors
  if (error) return res.status(500).json({ error: error.errors[0].message })

  // returning
  return res.status(200).json(user)

}

exports.delete = async function (req, res) {

  const id = parseInt(req.body.id)

  let [user, error] = await Handler(User.findByPk(id))

  if (error) return res.status(500).json({ error })

  if (!user) return res.status(400).json({ error: `Can't find user with id ${id}` })

  let deleted = await user.destroy()

  if (!deleted) return res.status(500).json({ error })

  return res.status(200).json(deleted)
}


exports.update = async function (req, res) {
  const params = req.body
  const id = req.params.id

  // const errors = check_no_empty(params)
  // if (errors) return res.status(409).json(errors)

  let [user, errorInput] = await Handler(User.findByPk(id))

  if (errorInput) return res.status(500).json(errorInput)
  if (!user) return res.status(400).json({ error: `Can't find user with id ${id}` })

  // update the user
  for (let key of Object.keys(params)) {
    if (params[key] !== undefined) {
      user[key] = params[key]
    }
  }
  user.updated_at = Date.now('yyyy-mm-dd hh:mm:ii')

  user.save()
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((error) => {
      const errors = []

      error.errors.forEach(error => {
        errors.push(error.message)
      });

      res.status(200).json(errors)
    })

}