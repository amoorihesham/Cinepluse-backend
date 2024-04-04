const mongose = require('mongoose');

const watchlist_Schema = new mongose.Schema({
	userId: { type: mongose.Types.ObjectId, required: true },
	movies: { type: Array, default: [] },
});

module.exports = watchlist_Schema;
