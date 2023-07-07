const express = require('express');
const router = express.Router();
const { stripe } = require('../../config/keys');
const _stripe = require('stripe')(stripe.secretKey);
const { v4: uuidv4 } = require('uuid');

const description = 'Invoice for services rendered';

router.get('/', async (req, res, next) => {
    console.log('GET Response from Researcher');
    res.json({
        message: 'It Works'
    });
});

router.post('/pay', async (req, res, next) => {
    console.log(req.body.token);
    const { token, amount } = req.body;
    const idempotencyKey = uuidv4();

    return _stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        _stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey})
    }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;