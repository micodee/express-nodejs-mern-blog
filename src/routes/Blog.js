const express = require('express')
const {body} = require('express-validator') // cek validasi

const router = express.Router()

const blogControllers = require('../controllers/Blog')

// [POST] : /v1/blog/post
router.post('/post', [
    body('title').isLength({min: 5}).withMessage('Input Title Kurang Dari 5 Huruf'), 
    body('body').isLength({min: 5}).withMessage('Input Content Kurang Dari 5 Huruf')
], blogControllers.createBlogPost)

router.get('/posts', blogControllers.getAllBlogPost)

module.exports = router