const Product = require("../../../../models/admin/product");

const getProducts = async (req, res) => {
  try {
    const response = await Product.find()
      .populate({
        path: "product_category",
        populate: { path: "parent_category", select: "name" },
      })
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

const getProductById = async (req, res) => {
  try {
    const response = await Product.findById(req.params._id)
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

const getProductsByIds = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not found." });
    }
    const wishList = Object.values(req.query);
    console.log(wishList);
    const product_ids = wishList.map((product) => product._id);
    const size_ids = wishList.map((product) => product.size);
    const color_ids = wishList.map((product) => product.color);
    const quantity = wishList.map((product) => product.quantity);

    const response = await Product.find({ _id: { $in: product_ids } })
      .populate({ path: "product_category", select: "product_category_name" })
      .populate({
        path: "size",
        match: { _id: { $in: size_ids } },
        select: "size",
      })
      .populate({
        path: "color",
        match: { _id: { $in: color_ids } },
        select: "color",
      });

    const filepath = `${req.protocol}://${req.get(
      "host"
    )}/frankandoak/product-list/`;
    response.quantity = quantity;
    response.user_id = req.user._id;

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

module.exports = { getProducts, getProductById, getProductsByIds };
