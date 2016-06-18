// Imports
import express, {Router} from "express";
import Path from "path";

// Constants
const clientFile = Path.resolve(__dirname, "../client");// Set an absolute path
const routes = Router();// Start an Express router

// Create routes
// Catch-all route
routes.use("/*", (req, res) => {
	res.sendFile(clientFile + "/index.html");
})

// Server start based on environment
if(process.env.NODE_ENV !== 'test'){
	const app = express();// Start express server
	app.use(express.static(clientFile));// Send files to cache

	app.use('/', routes);// Connect routes with the created server
	const port = process.env.PORT || 8000;// Grab and assign the port, then listen
	app.listen(port);
	console.log("Environment: ", process.env.NODE_ENV);// Console log to show environment and port in CLI
	console.log("Express server listening on port: ", port);
}
else{// Test environment
	console.log("Environment: ", process.env.NODE_ENV);
	module.exports = routes;
}
