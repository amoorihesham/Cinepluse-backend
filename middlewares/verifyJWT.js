const jwt = require('jsonwebtoken');
const resStatus = require('../utils/response.status');
const { response } = require('express');

const verifyJWT = async (req, res, next) => {
	const authHeaders = req.headers.Authorization || req.headers.authorization;
	// console.log(authHeaders);
	if (!authHeaders?.startsWith('Bearer ')) {
		console.log('no auth aslan');
		return res.status(401).json({
			status: resStatus.FAIL,
			message: 'Unauthorized',
		});
	}
	const token = authHeaders.split(' ')[1];
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) {
			return res.status(400).json({ status: resStatus.FAIL, message: 'Token expired.' });
		}
		next();
		return;
	});
};

module.exports = verifyJWT;
