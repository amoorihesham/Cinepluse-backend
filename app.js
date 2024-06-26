require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const appConfig = require('./app.config');
const Auth_Router = require('./routes/Auth.route');
const Watchlist_Route = require('./routes/watchlist.route');
const verifyJWT = require('./middlewares/verifyJWT');
const app = express();
const PORT = process.env.PORT || 2024;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: appConfig.frontendUri, credentials: true }));

app.use('/api', Auth_Router);
app.use('/api', verifyJWT, Watchlist_Route);

app.listen(PORT, () => {
	console.log(`****************************************
Server Running On Port ==> ${PORT} 
Frontend Site: ==> ${appConfig.frontendUri}
****************************************`);
});
