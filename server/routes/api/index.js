const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const contactRoutes = require('./contact');
const analyticsRoutes = require('./analytics');
const developerRoutes = require('./developer');
const newsletterRoutes = require('./newsletter');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const stripeRoutes = require('./stripe');
const wishlistRoutes = require('./wishlist');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// analytics routes
router.use('/analytics', analyticsRoutes);

// contact routes
router.use('/contact', contactRoutes);

// developer routes
router.use('/developer', developerRoutes);

// newsletter routes
router.use('/newsltter', newsletterRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Stripe routes
router.use('/stripe', stripeRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

module.exports = router;
