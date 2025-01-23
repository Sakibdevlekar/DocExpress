#!/usr/bin/env node
const path = require("path");
const chalk = require("chalk");
const generateDocs = require("../lib/generateDocs");

// Locate the config file
const configPath = path.join(process.cwd(), "docs.config.js");

(async function () {
    try {
        const config = require(configPath);
        console.log(chalk.green("Generating API documentation..."));
        await generateDocs(config);
        console.log(chalk.green("Documentation generated successfully!"));
    } catch (error) {
        console.error(
            chalk.red("Error generating documentation:"),
            error.message,
        );
    }
})();
