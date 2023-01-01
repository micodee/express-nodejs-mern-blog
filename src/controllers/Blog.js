const {validationResult} = require('express-validator')
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
