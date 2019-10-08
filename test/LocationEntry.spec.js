const expect = require("unexpected");

const LocationEntry = require("../lib/LocationEntry");

describe("LocationEntry", () => {
  it("should return coordinates correctly", () => {
    const location = new LocationEntry({
      long: -122,
      lat: 60
    });

    expect(location.coordinates, "to equal", [-122, 60]);
  });

  it("should return cached coordinates after first read", () => {
    const location = new LocationEntry({
      long: -122,
      lat: 60
    });
    const expectedCoordinates = location.coordinates;

    expect(location.coordinates, "to be", expectedCoordinates);
  });

  it("should exclude internals when converted to JSON", () => {
    const location = new LocationEntry({
      long: -122,
      lat: 60
    });

    expect(
      JSON.parse(JSON.stringify(location)),
      "not to have property",
      "_coordinates"
    );
  });
});
