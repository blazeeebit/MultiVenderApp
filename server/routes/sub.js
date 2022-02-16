const express = require('express');
const { addCategory, getCategories, deleteCategory, getCategory, updateCategory } = require('../controllers/sub');
const router = express.Router();
const { requireSignIn } = require('../middlewares/verify');

router.post('/sub', requireSignIn, addCategory);

router.get('/get-sub', requireSignIn, getCategories);

router.get('/get-sub/:catId', requireSignIn, getCategory);

router.put('/update-sub/:catId', requireSignIn, updateCategory);

router.delete('/delete-sub/:categoryId', requireSignIn, deleteCategory);

module.exports = router;
