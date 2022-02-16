const express = require('express');
const { addCategory, getCategories, deleteCategory, getCategory, updateCategory } = require('../controllers/category');
const router = express.Router();
const { requireSignIn } = require('../middlewares/verify');

router.post('/categories', requireSignIn, addCategory);

router.get('/get-categories', requireSignIn, getCategories);

router.get('/get-categories/:catId', requireSignIn, getCategory);

router.put('/update-category/:catId', requireSignIn, updateCategory);

router.delete('/delete-categories/:categoryId', requireSignIn, deleteCategory);

module.exports = router;
