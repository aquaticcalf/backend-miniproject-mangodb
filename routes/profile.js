const router = require('express').Router()
const { Post, Comment, User, Tag } = require('../models')
const auth = require('../middleware/auth')

// self profile
router.get('/', auth, async (request, response) => {
    try {
        const username = request.user.username

        const user = await User.findOne({ username })
            .populate({ path: 'posts', populate: [{ path: 'comments' }, { path: 'tags' }] })
            .populate('comments')

        if (!user) {
            return response.status(404).json({ message: 'user not found' })
        }

        const userProfile = {
            id: user._id,
            username: user.username,
            posts: user.posts.map((post) => ({
                id: post._id,
                title: post.title,
                content: post.content,
                tags: post.tags.map((tag) => ({
                    id: tag._id,
                    tag: tag.name,
                })),
                comments: post.comments.map((comment) => ({
                    id: comment._id,
                    content: comment.content,
                    userId: comment.userId,
                })),
            })),
            comments: user.comments.map((comment) => ({
                id: comment._id,
                content: comment.content,
                postId: comment.postId,
            })),
        }

        response.json(userProfile)
    }
    
    catch (error) {
      console.log(error)
      response.status(500).json({ message: 'error' })
    }
  })
  
  // others profile
  router.get('/:username', async (request, response) => {
    try {
        const username = request.params.username

        const user = await User.findOne({ username })
            .populate({ path: 'posts', populate: [{ path: 'comments' }, { path: 'tags' }] })
            .populate('comments')

        if (!user) {
            return response.status(404).json({ message: 'user not found' })
        }

        const userProfile = {
            id: user._id,
            username: user.username,
            posts: user.posts.map((post) => ({
                id: post._id,
                title: post.title,
                content: post.content,
                tags: post.tags.map((tag) => ({
                    id: tag._id,
                    tag: tag.name,
                })),
                comments: post.comments.map((comment) => ({
                        id: comment._id,
                        content: comment.content,
                        userId: comment.userId,
                })),
            })),
            comments: user.comments.map((comment) => ({
                id: comment._id,
                content: comment.content,
                postId: comment.postId,
            })),
        }

        response.json(userProfile)
    } 
    
    catch (error) {
        console.log(error)
        response.status(500).json({ message: 'error' })
    }
  })
  
module.exports = router