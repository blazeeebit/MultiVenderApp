const express = require('express');
const router = express.Router();
const { requireSignIn } = require('../middlewares/verify');
const { readCompanies, deleteCompany } = require('../controllers/users');

router.get('/companies', requireSignIn, readCompanies);

router.delete('/delete-company/:companyId', requireSignIn, deleteCompany);

module.exports = router;
