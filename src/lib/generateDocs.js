const fs = require("fs");
const glob = require("glob");
const path = require("path");
const chalk = require("chalk");

/**
 * Extracts route information from files
 * @param {string} filePath - Path of the file to parse
 * @returns {Array} Array of route objects
 */
function extractRouteInfo(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const routeRegex = /\.route\(['"`](.*?)['"`]/g;
    const routes = [];
    let match;

    while ((match = routeRegex.exec(fileContent)) !== null) {
        routes.push({
            method: "GET", // Simplify: Use real parser for full methods
            path: match[1],
            description: `Auto-generated description for ${match[1]}`,
        });
    }

    return routes;
}

/**
 * Generates Swagger documentation
 * @param {Object} config - User configuration
 */
function generateDocs(config) {
    const { files, output } = config;
    let allRoutes = [];

    // Parse all files specified in the config
    files.forEach((pattern) => {
        const filePaths = glob.sync(pattern);

        filePaths.forEach((filePath) => {
            const routes = extractRouteInfo(filePath);
            allRoutes = allRoutes.concat(routes);
        });
    });

    // Load the Swagger template
    const swaggerTemplate = require(
        path.join(__dirname, "../templates/swaggerTemplate.json"),
    );

    // Populate Swagger paths
    swaggerTemplate.paths = allRoutes.reduce((acc, route) => {
        if (!acc[route.path]) acc[route.path] = {};
        acc[route.path][route.method.toLowerCase()] = {
            description: route.description,
            responses: {
                200: { description: "Success" },
            },
        };
        return acc;
    }, {});

    // Write to the output file
    fs.writeFileSync(output, JSON.stringify(swaggerTemplate, null, 2));
    console.log(chalk.green(`Swagger documentation saved to ${output}`));
}

module.exports = generateDocs;
