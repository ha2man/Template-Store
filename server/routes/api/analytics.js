const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const { ROLES } = require('../../constants');
const Order = require('../../models/order');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');


// calculate income
router.get('/income', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        let total_income = 0;
        const { from_date, to_date } = req.body;
        const _from = new Date(from_date);
        const _to = new Date(to_date);

        const orders = await Order.find({ created: { $gte: _from, $lte: _to } });
        res.status(200).json({
            income: total_income
        })
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
});

// get orders count
router.get('/order/count', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const { from_date, to_date } = req.body;
        const _from = new Date(from_date);
        const _to = new Date(to_date);
        const count = await Order.find({created: { $gte: _from, $lte: _to }}).count();
        res.status(200).json({
            status: 'success',
            count
        })
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
});

// get orders
router.get('/order', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const { from_date, to_date } = req.body;
        const _from = new Date(from_date);
        const _to = new Date(to_date);
        const orders = await Order.find({created: { $gte: _from, $lte: _to }});
        res.status(200).json({
            status: 'success',
            orders
        })
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
});


module.exports = router;
