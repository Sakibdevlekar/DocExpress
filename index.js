const generateDocs = require("./lib/generateDocs");
const serveDocs = require("./lib/serveDocs");

/**
 * Main function to integrate the library
 * @param {Object} app - Express app instance
 * @param {string} route - The route to expose the documentation
 */
function docExpress(app, route) {
    const config = require(process.cwd() + "/docs.config.js");
    generateDocs(config);
    return serveDocs(config, route);
}

module.exports = docExpress;
