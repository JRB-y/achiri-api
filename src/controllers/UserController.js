const User = require('../models/User')
const Handler = require('../utils/Handler')
const check_no_empty = require('../utils/inputs/check_no_empty')

/**
 * Find a user.
 * We use this function in multiple places (show, delete, update)
 * 
 * @param {id} req id of the user to find
 * @param res
 */
const findUser = async (req, res) => {
  const id = req.params.id

  let [user, error] = await Handler(User.findByPk(id))

  if (error) return res.status(500).json(error)
  if (!user) return res.status(404).json({ error: `couldn't find user with id = ${id} !` })

  return user
}

/**
 * List of all users.
 * 
 * @method GET
 * @param id Number
 * @param data json
 */
exports.index = async (req, res) => {

  let [users, error] = await Handler(User.findAll())

  if (error) return res.status(500).json({ error })

  return res.status(200).json(users)
}

/**
 * Show User
 * 
 * @method GET
 * @param id Number
 */
exports.show = async (req, res) => {
  const user = await findUser(req, res)
  if (user) {
    return res.status(200).json(user)
  }
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

/**
 * Update a given user by params.id
 *
 * @method delete
 * @param 
 * @param data json
 */
exports.update = async function (req, res) {
  const params = req.body
  const errors = check_no_empty(params)
  if (errors) return res.status(409).json(errors)

  const user = await findUser(req, res)

  // update the user model (no persistance)
  for (let key of Object.keys(params)) {
    if (params[key] !== undefined) {
      user[key] = params[key]
    }
  }
  // updated_at
  user.updated_at = Date.now('yyyy-mm-dd hh:mm:ii')

  // save the user
  user.save()
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((error) => {
      const errors = []
      error.errors.forEach(error => {
        errors.push(error.message)
      })
      res.status(500).json(errors)
    })
}

/**
 * Delete a given user by params.id
 *
 * @method delete
 * @param id Number         : id of the user to edit
 * @param name String       : new name
 * @param email String      : new email
 * @param password String   : new password
 */
exports.delete = async function (req, res) {

  const user = await findUser(req, res)

  const [deleted, error] = await Handler(user.destroy())

  if (error) {
    const errors = []
    error.errors.forEach(error => {
      errors.push(error.message)
    })
    res.status(500).json(errors)
  }

  res.status(200).json(deleted)
}