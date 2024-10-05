const Product = require("../../../models/admin/product");
const path = require("path");
const fs = require("fs");

const addProducts = async (req, res) => {
  try {
    const data = req.body;

    if (req.files) {
      if (req.files.thumbnail) {
        data.thumbnail = req.files.thumbnail[0].filename;
      }
      if (req.files.hover_thumbnail) {
        data.hover_thumbnail = req.files.hover_thumbnail[0].filename;
      }
      if (req.files.images) {
        data.images = req.files.images.map((img) => img.filename);
      }
    }
    console.log(data);
    const dataToSave = new Product(data);
    const response = await dataToSave.save();

    res
      .status(200)
      .json({ message: "Product added successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const readProducts = async (req, res) => {
  try {
    const response = await Product.find()
      .populate("product_category", "product_category_name")
      .populate("size", "size")
      .populate("color", "color");
    const filename = `${req.protocol}://${req.get(
      "host"
    )}/frankandoak/products/`;
    res.status(200).json({
      message: "Product added successfully",
      data: response,
      filename: filename,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const response = await Product.updateOne(req.params, {
      $set: {
        status: req.body.newStatus,
      },
    });

    res.status(200).json({
      message: "Product status updated successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const response = await Product.deleteOne(req.params);

    res.status(200).json({
      message: "Product deleted successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProductFindById = async (req, res) => {
  try {
    const response = await Product.findById(req.params._id)
      .populate("product_category")
      .populate("color", "color")
      .populate("size", "size");
    const filepath = `${req.protocol}://${req.get(
      "host"
    )}/frankandoak/products/`;

    res.status(200).json({
      message: "Product deleted successfully",
      data: response,
      filename: filepath,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const oldProductData = await Product.findById(req.params._id);
    if (req.files) {
      if (req.files.thumbnail) {
        data.thumbnail = req.files.thumbnail[0].filename;
        if (!oldProductData) {
          res.status(400).json({ message: "Product is not available." });
        } else {
          if (
            fs.existsSync(
              path.join("./src/uploads/products", oldProductData.thumbnail)
            )
          ) {
            fs.unlinkSync(
              path.join("./src/uploads/products", oldProductData.thumbnail)
            );
          }
        }
      }

      if (req.files.hover_thumbnail) {
        data.hover_thumbnail = req.files.hover_thumbnail[0].filename;
        if (!oldProductData) {
          res.status(400).json({ message: "Product is not available." });
        } else {
          if (
            fs.existsSync(
              path.join(
                "./src/uploads/products",
                oldProductData.hover_thumbnail
              )
            )
          ) {
            fs.unlinkSync(
              path.join(
                "./src/uploads/products",
                oldProductData.hover_thumbnail
              )
            );
          }
        }
      }
      if (req.files.images) {
        data.images = req.files.images.map((img) => img.filename);

        if (!oldProductData) {
          return res.status(400).json({ message: "No Product available." });
        } else {
          oldProductData.images.map((img) => {
            // console.log(img);
            if (fs.existsSync(path.join("./src/uploads/products", img))) {
              fs.unlinkSync(path.join("./src/uploads/products/", img));
            }
          });
        }
      }

      console.log(data);
      const response = await Product.updateOne(req.params, {
        $set: data,
      });
      res
        .status(200)
        .json({ message: "Product updated successfully.", data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const multiDeleteProduct = async (req, res) => {
  try {
  console.log(req.body);
    const response = await Product.deleteMany({_id:
      {$in: req.body._ids}
    });

    res.status(200).json({ message: "Products deleted successfully.",data:response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  addProducts,
  readProducts,
  updateProductStatus,
  deleteSingleProduct,
  updateProductFindById,
  updateProduct,
  multiDeleteProduct,
};
