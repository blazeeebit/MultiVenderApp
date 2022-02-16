const User = require('../models/user');
const Company = require('../models/company');

exports.readusers = async (req, res) => {
	let allusers = await User.find({}).exec();
	res.json(allusers);
};

exports.deleteUsers = async (req, res) => {
	let deletedUser = await User.findByIdAndDelete(req.params.userId).exec();
	res.json(deletedUser);
};

exports.readCompanies = async (req, res) => {
	let allCompanies = await Company.find({}).exec();
	res.json(allCompanies);
};

exports.deleteCompany = async (req, res) => {
	let deletedCompany = await Company.findByIdAndDelete(req.params.companyId).exec();
	res.json(deletedCompany);
};
