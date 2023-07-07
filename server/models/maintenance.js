const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const MaintenanceSchema = new Schema({
    from_date: {
      type: Date,
      default: Date.now
    },
    to_date: {
        type: Date,
        default: Date.now+3600000
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Maintenance