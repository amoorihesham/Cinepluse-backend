const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { genrateJwtToken, genrateJwtRefreshToken } = require('../utils/jwt');
const user = require('../models/user');
const resStatus = require('../utils/response.status');
const Hash_Password = require('../utils/hash.password');
const appConfig = require('../app.config');

async function Register(request, response) {
	const { firstName, lastName, email, password } = request?.body;
	try {
		await mongoose.connect(appConfig.mongodbUri);
		const isUserExist = await user.findOne({ email });
		if (!isUserExist) {
			const createdUser = await user.create({
				firstName,
				lastName,
				email,
				password: await Hash_Password(password),
			});

			return response.status(201).json({
				status: resStatus.SUCCESS,
				data: {
					id: createdUser._id,
					firstName: createdUser.firstName,
					lastName: createdUser.lastName,
					email: createdUser.email,
					isAdmin: createdUser.isAdmin,
					createdAt: createdUser.createdAt,
					updatedAt: createdUser.updatedAt,
				},
			});
		} else {
			return response.status(400).json({
				status: resStatus.FAIL,
				data: {},
				message: 'Email address already in use.',
			});
		}
	} catch (err) {
		console.log(err);
		return response.status(500).json({
			status: resStatus.ERROR,
			data: {},
			message: 'Error occured when try to connect to database.',
		});
	} finally {
		mongoose.disconnect();
	}
}
async function Login(request, response) {
	const { email, password } = request?.body;
	try {
		await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
		const isUserExist = await user.findOne({ email });

		if (isUserExist) {
			const comparePassword = await bcrypt.compare(password, isUserExist.password);
			if (comparePassword) {
				const user = {
					_id: isUserExist._id,
					firstName: isUserExist.firstName,
					lastName: isUserExist.lastName,
					email: isUserExist.email,
					isAdmin: isUserExist.isAdmin,
				};
				const token = genrateJwtToken(user);
				const refToken = genrateJwtRefreshToken(user);

				response.cookie('RefreshToken', refToken, {
					maxAge: 7 * 24 * 60 * 60 * 1000,
					httpOnly: true,
					secure: true,
				});
				return response.status(200).json({
					status: resStatus.SUCCESS,
					message: 'Logged in',
					data: {
						...user,
						token,
					},
				});
			} else {
				return response.status(400).json({
					status: resStatus.FAIL,
					message: 'Your Creditials incorrect',
					data: {},
				});
			}
		} else {
			return response.status(404).json({
				status: resStatus.FAIL,
				message: 'This email address not registerd.',
			});
		}
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			status: resStatus.ERROR,
			data: {},
			message: 'Error occured when try to connect to database.',
		});
	} finally {
		mongoose.disconnect();
	}
}
async function Logout(request, response) {
	response.clearCookie('RefreshToken');

	return response.status(200).json({ status: resStatus.SUCCESS, message: 'Logged out' });
}
module.exports = { Register, Login, Logout };
