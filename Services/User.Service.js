const User = require('../Models/User.model')
const bcrypt = require('bcrypt');
const { authSchema } = require('../helpers/validation_schema')
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helper')

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)
      let doesExist = await User.findOne({ where: { email: result.email } });;
      if (doesExist) {
        const err = new Error(`${result.email} is already been registered`);
        err.statusCode = 404
        next(err)
      }
      const hashPassword = await bcrypt.hash(result.password, 10);
      const user = await User.create({ email: result.email, hashPassword: hashPassword });
      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)

      res.send({ success: true, accessToken, refreshToken })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)
      const user = await User.findOne({ email: result.email })
      if (!user) {
        const err = new Error('User not registered');
        err.statusCode = 404
        next(err)
      }
      const isMatch = await bcrypt.compare(result.password, user.hashPassword);
      if (!isMatch) {
        const err = new Error('Username/password not valid');
        err.statusCode = 401
        next(err)
      }
      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)

      res.send({ success: true, accessToken, refreshToken })
    } catch (error) {
      if (error.isJoi === true)
        error.status = 422
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        const err = new Error('Bad Request');
        err.statusCode = 401
        next(err)
      }
      const userId = await verifyRefreshToken(refreshToken)
      const accessToken = await signAccessToken(userId)
      const newRefreshToken = await signRefreshToken(userId)
      res.send({ success: true,accessToken: accessToken, refreshToken: newRefreshToken })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        const err = new Error('Bad Request');
        err.statusCode = 401
        next(err)
      }
      const userId = await verifyRefreshToken(refreshToken)
    } catch (error) {
      next(error)
    }
  },
}