const isDevelopment = true;

const appConfig = {
	mongodbUri: isDevelopment ? 'mongodb://localhost:27017/movieDB' : process.env.DATABASE_CONNECTION_STRING,
	frontendUri: isDevelopment ? 'localhost:3000' : 'https://cineplus-app.vercel.app',
};

module.exports = appConfig;
