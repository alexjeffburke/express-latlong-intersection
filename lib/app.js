const express = require("express");
const path = require("path");

const intersectionHandler = require("./handlers/intersection");
const loadData = require("./loadData");

const dataFile = path.join(__dirname, "..", "data", "intersections.csv");

function createServer() {
  const app = express();

  const locator = {
    data: loadData(dataFile)
  };

  app.use(intersectionHandler(locator));

  return app;
}

if (require.main === module) {
  createServer().listen(process.env.PORT || 3000);
} else {
  module.exports = createServer;
}
