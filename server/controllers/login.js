const User = require('../models/user');
const Company = require('../models/company');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	// console.log(req.body);
	const { email, password, role } = req.body;

	console.log(role);

	if (role == 'Company') {
		try {
			let company = await Company.findOne({ email }).exec();

			if (!company) {
				res.status(400).send('Company Not Found');
			} else {
				company.comparePassword(password, (err, match) => {
					if (!match || err) {
						return res.status(400).send('Wrong Password');
					} else {
						let token = jwt.sign({ _id: company._id }, process.env.JWT_SECRET, {
							expiresIn: '1d'
						});
						res.json({
							token,
							user: {
								_id: company._id,
								name: company.name,
								email: company.email,
								role: 'company',
								createdAt: company.createdAt,
								updatedAt: company.updatedAt
							}
						});
					}
				});
			}
		} catch (error) {}
	}
	if (role == 'User') {
		try {
			//check if user exists
			let user = await User.findOne({ email }).exec();

			// console.log('User exists', user);
			if (!user) {
				res.status(400).send('User not found');
			} else {
				//compare password
				user.comparePassword(password, (err, match) => {
					if (!match || err) {
						return res.status(400).send('Wrong Password');
					} else {
						// onsole.log('Generate Token');
						let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
							expiresIn: '1d'
						});
						res.json({
							token,
							user: {
								_id: user._id,
								name: user.name,
								email: user.email,
								role: user.role,
								createdAt: user.createdAt,
								updatedAt: user.updatedAt
							}
						});
					}
				});
			}
		} catch (error) {
			console.log('Login Error', err);
			res.status(400).send('Signin Failed');
		}
	}
};

module.exports = login;
