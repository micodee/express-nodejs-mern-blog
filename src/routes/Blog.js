const express = require('express')
const {body} = require('express-validator') // cek validasi

const router = express.Router()

const blogControllers = require('../controllers/Blog')

// [POST] : /v1/blog/post
router.post('/post', [
    body('title').isLength({min: 5}).withMessage('Input Title Kurang Dari 5 Huruf'), 
    body('body').isLength({min: 5}).withMessage('Input Content Kurang Dari 5 Huruf')
], blogControllers.createBlogPost)

// router.get('/posts?page=1&perPage=10', blogControllers.getAllBlogPost)
router.get('/posts', blogControllers.getAllBlogPost)
router.get('/post/:postId', blogControllers.getIdBlogPost)

router.put('/post/:postId', [
    body('title').isLength({min: 5}).withMessage('Input Title Kurang Dari 5 Huruf'), 
    body('body').isLength({min: 5}).withMessage('Input Content Kurang Dari 5 Huruf')
], blogControllers.updateBlogPost)

router.delete('/post/:postId', blogControllers.deleteBlogPost)

module.exports = router