const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
const OrderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number,
    default: 0
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Order', OrderSchema);
