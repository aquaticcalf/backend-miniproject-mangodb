const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models')

// register
router.post('/register', async (request, response) => {
    try {

        const { username, email, password } = request.body
        const user = await User({ username, email, password }).save()

        response.status(201).json(user)

        // todo : email verification
    }
    catch (error) {
        
        if ( error.code === 11000 ) {
            return response.json({ message : 'user already exists' })
        }
        
        console.log(error)
        response.status(500).json({ message: 'error' })

    }
  
})

// login
router.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body

        // find user
        const [ foundUser ] = await User.findOne({ username })
        if ( foundUser.length === 0 ) {
            return response.status(400).json({ message: 'invalid credentials' })
        }

        // check if password is correct
        const isPasswordValid = await foundUser.validatePassword(password)
        if(!isPasswordValid) {
            return response.status(400).json({ message : 'invalid credentials' })
        }

        // generate a jwt
        const token = jwt.sign({ userId: foundUser._id }, 'secret_key', { expiresIn: '1h' })

        response.json({ token })

        // todo : forgot password
    }
    catch (error) {

        // really bad error handling system for now
        
        console.log(error)

        response.status(500).json({ message: 'error' })

    }
})

module.exports = router