const expect = require("unexpected");
const path = require("path");

const loadData = require("../lib/loadData");
const LocationEntry = require("../lib/LocationEntry");

describe("loadData", () => {
  it("should return LocatinEntry objects", () => {
    const dataFile = path.join(__dirname, "..", "testdata", "example.csv");

    expect(
      loadData(dataFile),
      "to have items satisfying",
      "to be a",
      LocationEntry
    );
  });
});
