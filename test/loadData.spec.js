const expect = require("unexpected");
const path = require("path");

const loadData = require("../lib/loadData");
const LocationEntry = require("../lib/LocationEntry");

describe("loadData", () => {
  it("should throw when passed a bogus path", () => {
    const dirPath = path.join(__dirname, "..", "testdat");

    expect(
      () => {
        loadData(dirPath);
      },
      "to throw",
      `unable to load data from: ${dirPath}`
    );
  });

  it("should throw when passed a directory", () => {
    const dirPath = path.join(__dirname, "..", "testdata");

    expect(
      () => {
        loadData(dirPath);
      },
      "to throw",
      `unable to load data from: ${dirPath}`
    );
  });

  it("should return LocationEntry objects", () => {
    const dataFile = path.join(__dirname, "..", "testdata", "example.csv");

    expect(
      loadData(dataFile),
      "to have items satisfying",
      "to be a",
      LocationEntry
    );
  });
});
