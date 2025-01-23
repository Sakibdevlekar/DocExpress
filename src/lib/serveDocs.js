const express = require("express");
const basicAuth = require("express-basic-auth");

/**
 * Middleware to serve Swagger documentation
 * @param {Object} config - User configuration
 * @param {string} route - The route to serve the documentation
 * @returns {Function} Express middleware
 */
function serveDocs(config, route) {
    const router = express.Router();
    const { output, auth } = config;

    if (auth?.enabled) {
        router.use(
            basicAuth({
                users: { [auth.username]: auth.password },
                challenge: true,
            }),
        );
    }

    router.get(route, (req, res) => {
        res.sendFile(output, { root: process.cwd() });
    });

    return router;
}

module.exports = serveDocs;
