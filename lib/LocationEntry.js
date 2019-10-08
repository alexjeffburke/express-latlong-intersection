class LocationEntry {
  constructor(values) {
    this.x = values.x;
    this.y = values.y;
    this.lat = values.lat;
    this.long = values.long;
    this.addressNumber = values.addressNumber;
    this.addressStreet = values.addressStreet;

    this._coordinates = null;
  }

  get coordinates() {
    if (!this._coordinates) {
      this._coordinates = [this.long, this.lat];
    }

    return this._coordinates;
  }

  toJSON() {
    const result = { ...this };
    delete result._coordinates;
    return result;
  }
}

LocationEntry.fromData = dataArr => {
  const [addressNumber, addressStreet, x, y, lat, long] = dataArr;

  return LocationEntry.fromObject({
    addressNumber,
    addressStreet,
    x,
    y,
    lat,
    long
  });
};

function numberOrNaN(val) {
  if (typeof val === "number") {
    return val;
  }

  return typeof val === "string" && val ? Number(val) : NaN;
}

LocationEntry.fromObject = values => {
  values = values || {};
  const long = numberOrNaN(values.long);
  const lat = numberOrNaN(values.lat);

  if (Number.isNaN(long) || Number.isNaN(lat)) {
    throw new Error("invalid lat or long");
  }

  return new LocationEntry({
    ...values,
    long,
    lat
  });
};

module.exports = LocationEntry;
