const express = require('express')

const router = express.Router()

const blogControllers = require('../controllers/Blog')

// [POST] : /v1/blog/post
router.post('/post', blogControllers.createBlogPost)

module.exports = router