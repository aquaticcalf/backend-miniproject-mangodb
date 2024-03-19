const router = require('express').Router()
const { Post, Comment, User, Tag } = require('../models')
const auth = require('../middleware/auth')

// get all posts
router.get('/', async (request, response) => {
    try {
        const posts = await Post.find({})
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })
            .populate('tags')

        response.json(posts)
    } 
  
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' })
    }
})

// get a particular post
router.get('/:postid', async (request, response) => {
    try {
        const post = await Post.findById(request.params.postid)
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })
            .populate('tags')

        if (!post) {
            return response.status(404).json({ message: 'post not found' })
        }

        response.json(post)
    } 
    
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' })
    }
})

// create a new post
router.post('/new', auth, async (request, response) => {
    try {
        const { title, content, tags } = request.body
        const userId = req.user.id

        const tagPromises = tags.map(async (tagName) => {
            const existingTag = await Tag.findOne({ name: tagName })
            return existingTag || new Tag({ name: tagName })
        })

        const createdTags = await Promise.all(tagPromises)

        const post = await Post.create({ title, content, userId, tags: createdTags })

        const postWithTags = await Post.findById(post._id)
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })
            .populate('tags')

        response.status(201).json(postWithTags)
    } 
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' })
    }
})

// search for a post
router.get('/search', async (request, response) => {
    try {
        const { title, tags } = request.query
        const query = {}

        if (title) {
            query.title = new RegExp(title, 'i')
        }

        if (tags) {
            query.tags = { $in: tags.split(',') }
        }

        const posts = await Post.find(query)
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })
            .populate('tags')

        response.json(posts)
    } 
  
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' })
    }
})