const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { SECRET_KEY } = require('../../config')
import { Utils } from './../../utils/Utils'

module.exports = {
	Mutation: {
		async register(parent, { registerInput: { userName, email, password, confirmPassword } }) {
			const isValid = Utils.validateRegisterFields({ userName, email, password, confirmPassword })
			if (Object.keys(isValid).length) {
				throw new UserInputError('Mandatory fields missing!', { errors: { ...isValid } })
			}
			const user = await User.findOne({ userName: userName })
			if (user) {
				throw new UserInputError('User already exist!', {
					errors: {
						userName: 'User name already taken, try another!'
					}
				})
			}
			password = await bcrypt.hash(password, 12)
			const newUser = new User({
				email,
				userName,
				password,
				createdAt: new Date().toISOString()
			})

			const res = await newUser.save()
			const token = jwt.sign(
				{
					id: res.id,
					userName: res.userName,
					email: res.email
				},
				SECRET_KEY,
				{ expiresIn: '1h' }
			)
			return {
				...res._doc,
				id: res._id,
				token
			}
		}
	}
}
