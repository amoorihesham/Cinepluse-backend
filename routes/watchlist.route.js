const express = require('express');
const { AddToWatchlist, GetWatchlistMovies, RemoveFromWatchlist } = require('../controllers/wathlist.controllers');
const verifyJWT = require('../middlewares/verifyJWT');
const Watchlist_Route = express.Router();

Watchlist_Route.post('/watchlist/:userid', AddToWatchlist);
Watchlist_Route.delete('/watchlist/:userid', RemoveFromWatchlist);
Watchlist_Route.get('/watchlist/:userid', GetWatchlistMovies);

module.exports = Watchlist_Route;
