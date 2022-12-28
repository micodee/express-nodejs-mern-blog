const express = require("express");
const cors = require('cors')

const app = express();

const productRoutes = require('./src/routes/Products')

app.use(cors(), (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use("/", productRoutes);

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
