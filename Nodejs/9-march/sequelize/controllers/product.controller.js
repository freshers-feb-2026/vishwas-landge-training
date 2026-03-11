import { validateUser } from "../utils/index.js";
import Product from "../models/product.js";


export const addProduct = async (req, res) => {
  try {

    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getProduct = async (req, res) => {

  const { id } = req.params;

  try {

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


export const getAllProducts = async (req, res) => {

  try {

    const products = await Product.findAll();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


