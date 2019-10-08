const expect = require("unexpected");
const turf = require("@turf/turf");

const IntersectionCalculator = require("../lib/IntersectionCalculator");
const LocationEntry = require("../lib/LocationEntry");

describe("IntersectionCalculator", () => {
  it("should error with no locations", () => {
    expect(() => {
      new IntersectionCalculator();
    }, "to throw");
  });

  it("should allow instantiation with a LocationEntry", () => {
    const locations = [
      new LocationEntry({ long: 0, lat: 0 }),
      new LocationEntry({ long: 2, lat: 0 })
    ];
    const instance = new IntersectionCalculator(locations);

    expect(instance, "to satisfy", {
      locations,
      outerLine: expect.it("to be an object")
    });
  });

  describe("#determineNearestCrossingPoint", () => {
    it("should allow retrieving locations entries by coordinates", () => {
      const instance = new IntersectionCalculator([
        new LocationEntry({ long: 0, lat: 0 }),
        new LocationEntry({ long: 2, lat: 0 })
      ]);

      const fromLocation = new LocationEntry({ long: 1, lat: 1 });
      const fromPoint = turf.point(fromLocation.coordinates);

      expect(instance.determineNearestCrossingPoint(fromPoint), "to satisfy", {
        properties: {
          index: 0
        },
        geometry: {
          coordinates: [expect.it("to be close to", 1, 1e-9), 0]
        }
      });
    });
  });

  describe("#findNearestLocation", () => {
    it("should allow retrieving locations entries by coordinates", () => {
      const expectedEntry = new LocationEntry({ long: 0, lat: 0 });
      const instance = new IntersectionCalculator([
        expectedEntry,
        new LocationEntry({ long: 2, lat: 0 })
      ]);

      const fromLocation = new LocationEntry({ long: 1, lat: 1 });

      expect(
        instance.findNearestLocation(fromLocation),
        "to exhaustively satisfy",
        {
          bearing: {
            absolute: expect.it("to be close to", -134.995, 1e-3)
          },
          location: expectedEntry
        }
      );
    });
  });

  describe("bearingToDirection()", () => {
    describe("when positive", () => {
      it("should return a named bearing", () => {
        expect(
          IntersectionCalculator.bearingToDirection(135),
          "to equal",
          "SE"
        );
      });

      it("should round down correctly", () => {
        expect(
          IntersectionCalculator.bearingToDirection(157.4),
          "to equal",
          "SE"
        );
      });

      it("should round up correctly", () => {
        expect(
          IntersectionCalculator.bearingToDirection(157.5),
          "to equal",
          "S"
        );
      });

      it("should handle near zero correctly", () => {
        expect(IntersectionCalculator.bearingToDirection(0.1), "to equal", "N");
      });
    });

    describe("when negative", () => {
      it("should return a named bearing", () => {
        expect(
          IntersectionCalculator.bearingToDirection(-135),
          "to equal",
          "SW"
        );
      });

      it("should round down correctly", () => {
        expect(
          IntersectionCalculator.bearingToDirection(-157.4),
          "to equal",
          "SW"
        );
      });

      it("should round up correctly", () => {
        expect(
          IntersectionCalculator.bearingToDirection(-157.5),
          "to equal",
          "S"
        );
      });

      it("should handle near zero correctly", () => {
        expect(
          IntersectionCalculator.bearingToDirection(-0.1),
          "to equal",
          "N"
        );
      });
    });
  });
});
