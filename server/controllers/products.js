const Product = require('../models/products');

exports.create = async (req, res) => {
	try {
		req.body.user = req.user._id;
		const newProduct = await new Product(req.body).save();
		res.json(newProduct);
	} catch (error) {
		console.log(error);
		res.status(400).send('Create product failed');
	}
};

exports.read = async (req, res) => {
	let products = await Product.find({}).populate('user', '_id name').exec();
	res.json(products);
};

exports.sellerProduct = async (req, res) => {
	let products = await Product.find({ user: req.user._id }).populate('user', '_id name').exec();
	res.send(products);
};

exports.deleteProduct = async (req, res) => {
	let deleted = await Product.findByIdAndDelete(req.params.productId).exec();
	res.json(deleted);
};
