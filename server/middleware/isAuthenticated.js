// Lines 2-4 are configuring and requiring the .env file, initializing the jwt variable as the json web token implementation
require("dotenv").config();
const jwt = require("jsonwebtoken"); // requires the "jsonwebtoken" library ie used to encode and decode JSON Web Tokens (JWTs). This lib is for authentication middleware to verify the token passed in the request header.
const { SECRET } = process.env; 

module.exports = {
	// module.exports has one function called isAuthenticated which takes in req, res, and next as its parameters.//exports an object with a single method named isAuthenticated that will be used as middleware to check if a request is authenticated. The method takes three arguments: req, res, and next.

	isAuthenticated: (req, res, next) => {
		//Line 9 creates the headerToken variable. //If the header is missing, it sends a 401 Unauthorized response


		const headerToken = req.get("Authorization");

		//  Lines 16 - 19 will send a console log and status code of 401 if the headerToken is not present.

		if (!headerToken) {
			console.log("Middleware Error");
			res.sendStatus(401);
		};

		//Line 18 is declaring the token variable.

		let token;

		//The try/catch block below initializes the token variable and throws an error if the token is not present
		try {
			token = jwt.verify(headerToken, SECRET); //  If token  present, it tries to verify the token using the jwt.verify method, passing in the token and the SECRET variable.
		} catch (err) {
			//This will send a status code for a server error
			err.statusCode = 500;
			throw err;
		};

		if (!token) {
			const error = new Error("You are not authenticated to view this.");
			//This will send a status code for a client error
			error.statusCode = 401;
			throw error;
		};

		next();
		//If the token is successfully verified, the method calls the next function to move on to the next middleware in the chain. In express mw next function is a standard argument. It allows control of flow to next mw in chain after the first has executed. if next is not called, control flow stops adn res not sent back to client server.
	},
};
