const sequelize = require('../db')
const { Sequelize, Model } = require('sequelize')

class User extends Model { }

User.init({
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'users_unique'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
  deleted_at: Sequelize.DATE
}, {
  modelName: 'user',
  sequelize,
  timestamps: false,
  updatedAt: 'created_at',
  createdAt: 'deleted_at',
  uniqueKeys: {
    users_unique: { fields: ['email'] }
  }
})

module.exports = User