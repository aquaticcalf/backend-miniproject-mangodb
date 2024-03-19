const jwt = require('jsonwebtoken')
const { User } = require('../models')

const auth = async ( request, response, next ) => {
	const token = request.header('Authorization')

	if( !token ) {
		return response.status(401).json({ message : 'authorization denied' })
	}

	try {
		const decoded = jwt.verify( token, 'secret_key' )
		const user = await User.findById(decoded.userId)

		if (!user) {
			return response.status(401).json({ message : 'invalid token' })
		}

		request.user = user
		next()
	}

	catch (error) {
		response.status(400).json({ message : 'invalid token' })
	}
}

module.exports = auth