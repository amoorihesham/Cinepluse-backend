const mongose = require('mongoose');
const watchlist_Schema = require('../schemas/watchlist.schema');

const watchlist = mongose.model('watchlist', watchlist_Schema);

module.exports = watchlist;
