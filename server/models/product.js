const Mongoose = require('mongoose');
const { Schema } = Mongoose;


// Product Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  slug: {
    type: String,
    unique: true
  },
  imageUrl: [
    { type: String }
  ],
  imageKey: [
    { type: String }
  ],
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Product', ProductSchema);
