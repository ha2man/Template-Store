const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const { ROLES } = require('../../constants');
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const Refund = require('../../models/refund');
const Imports = require('../../models/imports');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');


// calculate income
router.get('/income', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        let total_income = 0;
        const { from_date, to_date } = req.body;
        const _from = new Date(from_date);
        const _to = new Date(to_date);

        const carts = await Cart.find({ created: { $gte: _from, $lte: _to } });
        carts.foreach(cart => {
            total_income += cart.products
                .filter(product => product.status !== 'Cancelled')
                .reduce((sum, current) => sum + current.totalPrice, 0);
        })
        res.status(200).json({
            income: total_income
        })
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
});

// calculate expense
router.get('/expense', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        let total_expense = 0;
        const { from_date, to_date } = req.body;
        const _from = new Date(from_date);
        const _to = new Date(to_date);
        const imports = await Imports.find({ created: { $gte: _from, $lte: _to } });
        imports.foreach(item => {
            total_expense += item.totalPrice;
        })
        res.status(200).json({
            expense: total_expense
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
