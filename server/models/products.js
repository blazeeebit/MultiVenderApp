const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
			text: true
		},
		description: {
			type: String,
			required: true,
			maxlength: 2000,
			text: true
		},
		price: {
			type: Number,
			required: true,
			trim: true,
			maxlength: 32
		},
		user: {
			type: ObjectId,
			ref: 'Company'
		},
		category: {
			type: String,
			required: true,
			trim: true
		},
		quantity: {
			type: Number
		},
		sold: {
			type: Number,
			default: 0
		},
		images: {
			type: Array
		},
		shipping: {
			type: String,
			enum: [ 'Yes', 'No' ]
		},
		color: {
			type: String,
			enum: [ 'black', 'red', 'brown', 'white', 'blue' ]
		},
		Brand: {
			type: String,
			enum: [ 'Nike', 'Adidas', 'Yeezys', 'Jordans', 'Gucci' ]
		},
		ratings: [
			{
				star: Number,
				postedBy: {
					type: ObjectId,
					ref: 'User'
				}
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
