const express = require('express');
const router = express.Router();
const { requireSignIn } = require('../middlewares/verify');
const { readusers, deleteUsers } = require('../controllers/users');

router.get('/users', requireSignIn, readusers);

router.delete('/delete-users/:userId', requireSignIn, deleteUsers);

module.exports = router;
