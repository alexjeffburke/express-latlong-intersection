const expect = require("unexpected");

const LocationEntry = require("../lib/LocationEntry");

describe("LocationEntry", () => {
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
