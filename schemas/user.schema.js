const mongose = require('mongoose');

const user_shcema = new mongose.Schema(
	{
		firstName: { type: String, required: true, maxLength: 16, minLength: 4 },
		lastName: { type: String, required: true, maxLength: 16, minLength: 4 },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minLength: 6 },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = user_shcema;
