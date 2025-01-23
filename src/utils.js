const express = require("express");
const generateDocs = require("./lib/generateDocs");
const authMiddleware = require("./lib/serveDocs");

function docsMiddleware(config) {
    const router = express.Router();
    const docs = generateDocs(config);

    // Apply authentication middleware if enabled
    if (config.auth && config.auth.enabled) {
        router.use(authMiddleware(config));
    }

    // Serve documentation
    router.get("/", (req, res) => {
        res.json(docs);
    });

    return router;
}

module.exports = docsMiddleware;
