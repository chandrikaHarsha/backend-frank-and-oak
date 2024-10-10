const Product = require("../../../../models/admin/product");

const getProducts = async (req, res) => {
  try {
    const response = await Product.find()
      .populate("product_category")
      .populate("size")
      .populate("color");

    const filepath = `${req.protocol}://${req.get(
      "host"
    )}/frankandoak/product-list/`;

    res.status(200).json({
      message:
        "Products, sizes, colors, product category fetched successfully.",
      data: response,
      filepath: filepath,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getProducts };
