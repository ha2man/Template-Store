const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongoose = require('mongoose');

// Bring in Models & Utils
const Product = require('../../models/product');
const Brand = require('../../models/brand');
const Category = require('../../models/category');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../utils/auth');
const { s3Upload } = require('../../utils/storage');
const {
  getStoreProductsQuery,
  getStoreProductsWishListQuery
} = require('../../utils/queries');
const { ROLES } = require('../../constants');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// fetch product slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const productDoc = await Product.findOne({ slug, isActive: true });

    if (!productDoc) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      product: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch product name search api
router.get('/list/search/:name', async (req, res) => {
  try {
    const name = req.params.name;

    const productDoc = await Product.find(
      { name: { $regex: new RegExp(name), $options: 'is' }, isActive: true },
      { name: 1, slug: 1, imageUrl: 1, price: 1, _id: 0 }
    );

    if (productDoc.length < 0) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      products: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch store products by advanced filters api
router.get('/list', async (req, res) => {
  try {
    let {
      sortOrder,
      rating,
      max,
      min,
      category,
      page = 1,
      limit = 10
    } = req.query;
    sortOrder = JSON.parse(sortOrder);

    const categoryFilter = category ? { category } : {};
    const basicQuery = getStoreProductsQuery(min, max, rating);

    const userDoc = await checkAuth(req);
    const categoryDoc = await Category.findOne(
      { slug: categoryFilter.category, isActive: true },
      'products -_id'
    );

    if (categoryDoc && categoryFilter !== category) {
      basicQuery.push({
        $match: {
          isActive: true,
          _id: {
            $in: Array.from(categoryDoc.products)
          }
        }
      });
    }

    let products = null;
    const productsCount = await Product.aggregate(basicQuery);
    const count = productsCount.length;
    const size = count > limit ? page - 1 : 0;
    const currentPage = count > limit ? Number(page) : 1;

    // paginate query
    const paginateQuery = [
      { $sort: sortOrder },
      { $skip: size * limit },
      { $limit: limit * 1 }
    ];

    if (userDoc) {
      const wishListQuery = getStoreProductsWishListQuery(userDoc.id).concat(
        basicQuery
      );
      products = await Product.aggregate(wishListQuery.concat(paginateQuery));
    } else {
      products = await Product.aggregate(basicQuery.concat(paginateQuery));
    }

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage,
      count
    });
  } catch (error) {
    console.log('error', error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// get product name list
router.get('/list/select', auth, async (req, res) => {
  try {
    const products = await Product.find({}, 'name');

    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// add product api
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin, ROLES.Developer),
  upload.single('image'),
  async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const isActive = req.body.isActive;
      const image = req.file;

      if (!description || !name) {
        return res
          .status(400)
          .json({ error: 'You must enter description & name.' });
      }

      if (!price) {
        return res.status(400).json({ error: 'You must enter a price.' });
      }

      const { imageUrl, imageKey } = await s3Upload(image);

      const product = new Product({
        name,
        description,
        quantity,
        price,
        isActive,
        imageUrl,
        imageKey
      });

      const savedProduct = await product.save();

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: savedProduct
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch products api
router.get(
  '/',
  auth,
  role.check(ROLES.Admin, ROLES.Developer),
  async (req, res) => {
    try {
      let products = [];

      if (req.user.developer) {
        products = await Product.find({developer: req.user.developer})
      } else {
        products = await Product.find({});
      }

      res.status(200).json({
        products
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch product api
router.get(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Developer),
  async (req, res) => {
    try {
      const productId = req.params.id;

      let productDoc = null;

      if (req.user.developer) {
        productDoc = await Product.findOne({ _id: productId, developer: req.user.developer })
      } else {
        productDoc = await Product.findOne({ _id: productId });
      }

      if (!productDoc) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }

      res.status(200).json({
        product: productDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Developer),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };
      const { slug } = req.body.product;

      const foundProduct = await Product.findOne({
        $or: [{ slug }]
      });

      if (foundProduct && foundProduct._id != productId) {
        return res
          .status(400)
          .json({ error: 'Slug is already in use.' });
      }

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Developer),
  async (req, res) => {
    try {
      const product = await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
