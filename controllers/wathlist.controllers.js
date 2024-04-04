const { default: mongoose } = require('mongoose');
const conString = require('../config/db.config');
const watchlist = require('../models/watchlist');
const resStatus = require('../utils/response.status');

async function AddToWatchlist(request, response) {
	const { userid } = request.params;
	try {
		await mongoose.connect(conString);
		const userWatchList = await watchlist.findOne({ userId: userid });
		if (!userWatchList) {
			const createWatchlist = await watchlist.create({ userId: userid, movies: [{ ...request.body }] });
			return response
				.status(201)
				.json({ status: resStatus.SUCCESS, message: 'Movie added successfully', watchlist: createWatchlist });
		}
		for (let i = 0; i < userWatchList.movies.length; i++) {
			if (userWatchList.movies[i].id === request.body.id) {
				return response.status(400).json({ status: resStatus.FAIL, message: 'Movie Already in watchlist' });
			}
		}
		userWatchList.movies.push(request.body);
		const saved = await userWatchList.save();
		return response
			.status(201)
			.json({ status: resStatus.SUCCESS, message: 'Movie added successfully', watchlist: saved });
	} catch (err) {
		return response.status(500).json({
			status: resStatus.ERROR,
			data: {},
			message: 'Error occured when try to connect to database.',
		});
	} finally {
		mongoose.disconnect();
	}
}

async function RemoveFromWatchlist(request, response) {
	const { userid } = request.params;
	const { movieId } = request.body;
	try {
		await mongoose.connect(conString);
		const userWatchlist = await watchlist.findOne({ userId: userid });
		if (!userWatchlist) {
			return response.status(400).json({ status: resStatus.FAIL, message: "This User Doesn't Have Watchlist Yet." });
		}

		const userMovies = userWatchlist.movies.filter((movie) => movie.id !== movieId);
		userWatchlist.movies = userMovies;
		const saved = await userWatchlist.save();
		return response.status(200).json({ status: resStatus.SUCCESS, watchlist: saved });
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

async function GetWatchlistMovies(request, response) {
	const { userid } = request.params;
	try {
		await mongoose.connect(conString);
		const userWatchlist = await watchlist.findOne({ userId: userid });
		if (userWatchlist) {
			return response.status(200).json({ status: resStatus.SUCCESS, watchlist: userWatchlist });
		}
		return response.status(200).json({ status: resStatus.SUCCESS, watchlist: null });
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
module.exports = {
	AddToWatchlist,
	RemoveFromWatchlist,
	GetWatchlistMovies,
};
