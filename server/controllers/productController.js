import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const product = await Product.findById(_id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updatedProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(_id, product, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndRemove(_id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
