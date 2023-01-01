const express = require("express");
const cors = require('cors') // perizinan agar api kita keterima di browser
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

const authRoutes = require('./src/routes/Auth')
const blogRoutes = require('./src/routes/Blog')

app.use(bodyParser.json()) // type JSON

app.use(cors(), (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

// blog controllers
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500
  const message = error.message
  const data = error.data
  res.status(status).json({message: message, data: data})
})

mongoose.connect('mongodb+srv://micode:eTvRD7ZZNyh3q68H@cluster0.pgof8ma.mongodb.net/?retryWrites=true&w=majority')
.then(() => { // apa bila berhasil
  const port = 3000;
  app.listen(port, () => console.log(`running on http://localhost:${port}`));
})
.catch(err => console.log(err)); // jika tidak berhasil

