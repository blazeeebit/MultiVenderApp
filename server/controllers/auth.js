const User = require('../models/user');
const Company = require('../models/company');

const register = async (req, res) => {
	const { email, role } = req.body;
	console.log(role);

	if (role == 'Company') {
		let companyEmail = await Company.findOne({ email }).exec();

		if (companyEmail) {
			return res.status(400).send('Company Registered');
		} else {
			const company = new Company(req.body);

			try {
				await company.save();
				return res.json({ ok: true });
			} catch (error) {
				return res.status(400).send('Registration Failed');
			}
		}
	}
	if (role == 'User') {
		let emailExist = await User.findOne({ email }).exec();

		if (emailExist) {
			return res.status(400).send('Email is taken');
		} else {
			//register user
			const user = new User(req.body);

			try {
				await user.save();
				console.log('Registration Successful ', user);
				return res.json({ ok: true });
			} catch (error) {
				console.log('Registration Failed : ', error);
				return res.status(400).send('Registration Failed');
			}
		}
	}
};

module.exports = register;
