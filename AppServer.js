const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')

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

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
