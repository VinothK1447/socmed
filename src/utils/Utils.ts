import { IUser } from '../tsProps/typeProps'

export class Utils {
	static validateRegisterFields(fields: IUser) {
		const { userName, email, password, confirmPassword } = fields
		const isValid = {}
		if (!userName) {
			isValid.userName = 'User name cannot be empty!'
		}
		if (!password) {
			isValid.password = 'Password cannot be empty!'
		}
		if (!confirmPassword) {
			isValid.confirmPassword = 'Confirm password cannot be empty!'
		}
		if (password && confirmPassword && password !== confirmPassword) {
			isValid.confirmPassword = 'Passwords do not match!'
		}
		if (!email) {
			isValid.email = 'Email cannot be empty!'
		}

		return isValid
	}
}
