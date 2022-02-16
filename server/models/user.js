const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: 'Name is required'
		},
		email: {
			type: String,
			trim: true,
			required: 'Email is required',
			unique: true
		},
		password: {
			type: String,
			required: 'Password is required',
			min: 8,
			max: 64,
			trim: true
		},
		role: {
			type: String,
			required: 'Please select a role',
			trim: true
		},
		userImage: {
			type: String,
			trim: true
		},
		paymentMethod: {
			type: String,
			trim: true,
			accountNumber: {
				number: Number
			}
		}
	},
	{ timestamps: true }
);

userSchema.pre('save', function(next) {
	let user = this;

	//hash password only if user is changing password or registering for the first time
	//make sure to use this otherwise each time user.save( is executed, password)
	//will get auto updated and you cant login with orignal password
	if (user.isModified('password')) {
		return bcrypt.hash(user.password, 12, function(err, hash) {
			if (err) {
				console.log('Hashing Error : ', err);
				return next(err);
			}
			user.password = hash;
			return next();
		});
	} else {
		return next();
	}
});
//user regular functions not arrows
userSchema.methods.comparePassword = function(password, next) {
	bcrypt.compare(password, this.password, function(err, match) {
		if (err) {
			return next(err, false);
		} else {
			//if no error we get null
			return next(null, match);
		}
	});
};

module.exports = mongoose.model('User', userSchema);
