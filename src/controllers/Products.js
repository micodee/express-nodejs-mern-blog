exports.createProduct = (req, res, next) => {
  res.json({
    message: "Create Product Success",
    data: {
        id: 1,
        name: "sari gandum",
        price: 9000
    }
  });
  next();
};

exports.getAllProducts = (req, res, next) => {
    res.json({
      message: "Get All Products Success",
      data: {
          id: 1,
          name: "sari gandum",
          price: 9000
      }
    });
    next();
  };