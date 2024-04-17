require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Auth_Router = require('./routes/Auth.route');
const Watchlist_Route = require('./routes/watchlist.route');
const verifyJWT = require('./middlewares/verifyJWT');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/api', Auth_Router);
app.use('/api', verifyJWT, Watchlist_Route);

app.listen(2024, () => {
	console.log('Server Running');
});
