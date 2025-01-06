/**
 * @module productController
 * @requires Product
 * @description Controller functions for handling product-related requests
 * @exports getProducts
 * @exports getProductsByUser
 * @exports getProductById
 * @exports addProduct
 * @exports updateProduct
 * @exports deleteProduct
 */
import Product from '../models/Product.js';

/**
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @description Get all products created by the logged-in user
 * @route GET /products
 */

const getProductsByUser = async (req, res) => {
  try {
    // User ID is extracted from the token by the authentication middleware
    const userId = req.user._id;

    // Find products created by this user
    const products = await Product.find({ user: userId });
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user's products:", error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des produits.' });
  }
};

/**
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @description Get all products from the database
 * @route GET /products
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @description Get a product by its ID
 * @route GET /products/:id
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * @description Add a new product to the database
 * @route POST /products
 */
const addProduct = async (req, res) => {
  const { name, price, description, image, countInStock } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  try {
    const product = new Product({
      user: req.user._id,
      name,
      price,
      description,
      image,
      countInStock,
    });

    const savedProduct = await product.save();
    res
      .status(201)
      .json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @description Update a product in the database
 * @route PATCH /products/:id 
 */
const updateProduct = async (req, res) => {
  const { name, price, description, image, countInStock } = req.body;

  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is the owner of the product
    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'User not authorized to update this product' });
    }

    // Update the product fields with new data from req.body
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.countInStock = countInStock || product.countInStock;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * @description Delete a product from the database
 * @route DELETE /products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is the owner of the product
    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'User not authorized to delete this product' });
    }

    // Delete the product
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getProducts,
  getProductsByUser,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
