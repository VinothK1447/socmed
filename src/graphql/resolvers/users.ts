const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { SECRET_KEY } = require('../../config')
import { Utils } from './../../utils/Utils'
import { IUser } from '../../tsProps/typeProps'

function generateToken(user: IUser) {
	return jwt.sign(
		{
			id: user.id,
			userName: user.userName,
			email: user.email
		},
		SECRET_KEY,
		{ expiresIn: '1h' }
	)
}

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
			const token = generateToken(res)
			return {
				...res._doc,
				id: res._id,
				token
			}
		},
		async login(parent, { userName, password }) {
			const isValid = Utils.validateLoginInput(userName, password)
			if (!Object.keys(isValid).length) {
				const user = await User.findOne({ userName })
				if (!user) {
					throw new UserInputError('Invalid login', {
						errors: {
							login: 'Invalid login attempt!'
						}
					})
				}
				const match = await bcrypt.compare(password, user.password)
				if (!match) {
					throw new UserInputError('Invalid credentials entered', {
						errors: {
							invalid: 'Invalid credentials entered!'
						}
					})
				}

				const token = generateToken(user)
				return {
					...user._doc,
					id: user._id,
					token
				}
			} else {
				throw new UserInputError('Mandatory fields missing!', { errors: { ...isValid } })
			}
		}
	}
}
