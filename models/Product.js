/**
 * @module Product
 * @description Product model for MongoDB
 */
import mongoose from 'mongoose';

/**
 * Product Schema
 * @type {mongoose.Schema}
 * @description Product schema for MongoDB
 * @property {mongoose.Schema.Types.ObjectId} user - The user ID
 * @property {String} name - The product name
 * @property {String} image - The product image
 * @property {String} description - The product description
 * @property {Number} price - The product price
 * @property {Number} countInStock - The product count in stock
 * @property {Date} createdAt - The creation date
 * @property {Date} updatedAt - The update date
 */
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    image: {
      type: String,
      required: [true, 'image is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'countInStock is required'],
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Product', productSchema);
