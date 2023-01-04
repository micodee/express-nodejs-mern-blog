const {validationResult} = require('express-validator')
const path = require('path') // untuk mengenal dirname
const fs = require('fs') // untuk remove image
const BlogPost = require('./../models/Blog')

exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    const err = new Error('input value tidak sesuai')
    err.errorStatus = 400,
    err.data = errors.array()
    throw err
  }
  if(!req.file) {
    const err = new Error('Image harus di Upload')
    err.errorStatus = 422
    throw err
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  
  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: 1,
      name: "micode" 
    }
  })
  Posting.save()
  .then(result => {
    const hasil = {
      message: "Create Blog Post Success",
      data: result
    };
    res.status(201).json(hasil);
  })
  .catch(err => {
    console.log('err: ', err);
  })

};

// =============================================================================================

exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
  .then(result => {
    res.status(200).json({
      message: "Data blog post berhasil dipanggil",
      data: result
    })
  })
  .catch(err => {
    next(err)
  })
}

// =============================================================================================

exports.getIdBlogPost = (req, res, next) => {
  BlogPost.findById(req.params.postId)
  .then(result => {
    if(!result) {
      const error = new Error('Blog post tidak ditemukan')
      error.errorStatus = 404
      throw error
    }
    res.status(200).json({
      message: "data blog post dengan ID berhasil dipanggil",
      data: result,
    })
  })
  .catch(err => {
    next(err)
  })
}

// =============================================================================================

exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req)

  if(!req.file) {
    const err = new Error('Image harus di Upload')
    err.errorStatus = 422
    throw err
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
  .then(post => {
    if(!post){
      const err = new Error('Blog Post tidak ditemukan')
      err.errorStatus = 404
      throw err
    }
    post.title = title
    post.body = body
    post.image = image

    return post.save()
  })
  .then(result => {
    res.status(200).json({
      message: "Update Sukses",
      data: result
    })
  })
  .catch(err => {
    next(err)
  })
}

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId
  BlogPost.findById(postId)
  .then(post => {
    if(!post){
      const err = new Error('Blog Post tidak ditemukan')
      err.errorStatus = 404
      throw err
    }
    removeImage(post.image)
    return BlogPost.findByIdAndRemove(postId)
  })
  .then(result => {
      res.status(200).json({
      message: 'Hapus Blog Post Berhasil',
      data: result
    })
  })
  .catch(err => {
    next(err)
  })
}
const removeImage = (filePath) => {
  // console.log('filePath', filePath);
  // console.log('dir name: ', __dirname);
  filePath = path.join(__dirname, '../..', filePath)
  fs.unlink(filePath, err => console.log(err))
}