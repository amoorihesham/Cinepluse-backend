const express = require('express');
const { AddToWatchlist, GetWatchlistMovies, RemoveFromWatchlist, ClearWatchlist } = require('../controllers/wathlist.controllers');

const Watchlist_Route = express.Router();

Watchlist_Route.post('/watchlist/:userid', AddToWatchlist);
Watchlist_Route.delete('/watchlist/:userid', RemoveFromWatchlist);
Watchlist_Route.get('/watchlist/:userid', GetWatchlistMovies);
Watchlist_Route.get('/watchlist/clear/:userid', ClearWatchlist);

module.exports = Watchlist_Route;
