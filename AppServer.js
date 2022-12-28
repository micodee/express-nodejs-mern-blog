const express = require("express");
const app = express();

const productRoutes = require('./src/routes/Products')

app.use("/", productRoutes);

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
