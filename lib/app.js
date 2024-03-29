const express = require("express");
const path = require("path");

const intersectionHandler = require("./handlers/intersection");
const IntersectionCalculator = require("./IntersectionCalculator");
const loadData = require("./loadData");

const dataFileName = path.join(__dirname, "..", "data", "intersections.csv");

function createServer(options) {
  options = options || {};
  const app = express();

  const locator = {
    data: loadData(options.dataFileName),
    intersector: null
  };
  locator.intersector = new IntersectionCalculator(locator.data);

  app.use(intersectionHandler(locator));

  return app;
}

if (require.main === module) {
  createServer({ dataFileName }).listen(process.env.PORT || 3000);
} else {
  module.exports = createServer;
}
