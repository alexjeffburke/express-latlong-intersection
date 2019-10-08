const turf = require("@turf/turf");

const bearingDirections = {
  0: "N",
  1: "NE",
  2: "E",
  3: "SE",
  4: "S",
  "-4": "S",
  "-3": "SW",
  "-2": "W",
  "-1": "NW",
  "-0": "N"
};

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

  determineBearing(fromPoint, toLocation) {
    const absoluteBearing = turf.bearing(
      fromPoint,
      turf.point(toLocation.coordinates)
    );

    return {
      absolute: absoluteBearing,
      direction: IntersectionCalculator.bearingToDirection(absoluteBearing)
    };
  }

  determineNearestCrossingPoint(fromPoint) {
    return turf.nearestPointOnLine(this.outerLine, fromPoint);
  }

  findNearestLocation(pointLocation) {
    const fromPoint = turf.point(pointLocation.coordinates);
    const { properties } = this.determineNearestCrossingPoint(fromPoint);
    const locationIndex = properties.index;

    if (locationIndex > -1 && locationIndex < this.locations.length) {
      const toLocation = this.locations[locationIndex];

      return {
        bearing: this.determineBearing(fromPoint, toLocation),
        location: toLocation
      };
    } else {
      throw new Error("determined point incosistent with locations");
    }
  }

  static bearingToDirection(absoluteBearing) {
    const isPositive = absoluteBearing >= 0;
    const bearingBase = absoluteBearing / 45;
    const bearingRemain = absoluteBearing % 45;

    let bearing;

    if (isPositive) {
      bearing = Math.floor(bearingBase);
      if (bearingRemain - 22.5 >= 0) {
        bearing += 1;
      }
    } else {
      bearing = Math.ceil(bearingBase);
      if (bearingRemain + 22.5 <= 0) {
        bearing -= 1;
      }
    }

    return bearingDirections[bearing];
  }
}

module.exports = IntersectionCalculator;
