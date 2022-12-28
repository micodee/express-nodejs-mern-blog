const express = require("express");
const app = express();

const router = express.Router();
router.use("/users", (req, res, next) => {
  res.json({
    name: "marcelino hidayat",
    email: "marcelino@gmail.com",
  });
  next();
});

router.use("/price", (req, res, next) => {
  res.json({
    price: 900000
  });
  next();
});

router.get("/customer", (req, res, next) => {
  res.json({
    title: "customer"
  });
  next();
});

app.use("/", router);

// methods get
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
