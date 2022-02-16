const Product = require('../models/products');

exports.createMulti = async (req, res) => {
	try {
		Object.keys(req.body).map(async (key) => {
			req.body[key].user = req.user._id;
			const newProduct = await new Product(req.body[key]).save();
			res.json(newProduct);
		});
		//
	} catch (error) {
		console.log(error);
		res.status(400).send('Create product failed');
	}
};
