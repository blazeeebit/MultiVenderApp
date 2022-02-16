const Sub = require('../models/sub');
const slugify = require('slugify');

exports.addCategory = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.name);
		const newCategory = await new Sub(req.body).save();
		res.json(newCategory);
	} catch (error) {
		console.log(error);
		res.status(400).send('Create Category failed');
	}
};

exports.getCategories = async (req, res) => {
	const getCategory = await Sub.find({}).exec();
	res.json(getCategory);
};

exports.deleteCategory = async (req, res) => {
	const deleteCat = await Sub.findByIdAndDelete(req.params.categoryId).exec();
	res.json('Category Deleted');
};

exports.getCategory = async (req, res) => {
	const getCategory = await Sub.findById(req.params.catId).exec();
	res.json(getCategory);
};

exports.updateCategory = async (req, res) => {
	req.body.slug = slugify(req.body.name);
	const updateCat = await Sub.findByIdAndUpdate(req.params.catId, req.body, { new: true });
	res.send('Category Updated');
};
