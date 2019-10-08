const turf = require("@turf/turf");

class IntersectionCalculator {
  constructor(locations) {
    if (!Array.isArray(locations) || locations.length < 2) {
      throw new Error("invalid or missing locations");
    }

    const points = [];
    locations.forEach(location => points.push(location.coordinates));

    this.locations = [...locations];
    this.outerLine = turf.lineString(points);
  }

  determineNearestCrossingPoint(fromPoint) {
    return turf.nearestPointOnLine(this.outerLine, fromPoint);
  }

  findNearestLocation(pointLocation) {
    const fromPoint = turf.point(pointLocation.coordinates);
    const { properties } = this.determineNearestCrossingPoint(fromPoint);
    const locationIndex = properties.index;

    if (locationIndex > -1 && locationIndex < this.locations.length) {
      const location = this.locations[locationIndex];

      return {
        bearing: {
          absolute: turf.bearing(fromPoint, turf.point(location.coordinates))
        },
        location
      };
    } else {
      throw new Error("determined point incosistent with locations");
    }
  }
}

module.exports = IntersectionCalculator;
