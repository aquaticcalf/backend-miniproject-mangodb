const router = require('express').Router()
const { Post, Comment, User, Tag } = require('../models')
const auth = require('../middleware/auth')

// get all comments for a post
router.get('/:postId/comments', async (request, response) => {
    try {
        const postId = request.params.postId

        const post = await Post.findById(postId)
            .populate({ path: 'comments', populate: 'user' })

        if (!post) {
            return response.status(404).json({ message: 'post not found' })
        }

        response.json(post.comments)
    }
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' })
    }
}) 

// create a new comment
router.post('/:postId/comments', auth, async (request, response) => {
    try {
        const { content } = request.body
        const postId = request.params.postId
        const userId = request.user.id

        const comment = await Comment.create({ content, postId, userId })

        const commentWithUser = await Comment.findById(comment._id).populate('user')

        response.status(201).json(commentWithUser)
    } 
  
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' })
    }
})

module.exports = router
