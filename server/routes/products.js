const express = require('express');
const { createMulti } = require('../controllers/multiProducts');
const router = express.Router();
const login = require('../controllers/login');
const { requireSignIn } = require('../middlewares/verify');

const { create, read, sellerProduct, deleteProduct } = require('../controllers/products');

router.post('/create-product', requireSignIn, create);

router.post('/create-multi-product', requireSignIn, createMulti);

router.get('/products', read);

router.get('/seller-products', requireSignIn, sellerProduct);

router.delete('/delete-product/:productId', requireSignIn, deleteProduct);

module.exports = router;
