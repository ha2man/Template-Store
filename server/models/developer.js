const Mongoose = require('mongoose');

const { DEVELOPER_STATUS } = require('../constants');

const { Schema } = Mongoose;

// Developer Schema
const DeveloperSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: DEVELOPER_STATUS.Waiting_Approval,
    enum: [
      DEVELOPER_STATUS.Waiting_Approval,
      DEVELOPER_STATUS.Rejected,
      DEVELOPER_STATUS.Approved
    ]
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Developer', DeveloperSchema);
