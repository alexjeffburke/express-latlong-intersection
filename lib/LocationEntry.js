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
}

LocationEntry.fromData = dataArr => {
  const [addressNumber, addressStreet, x, y, lat, long] = dataArr;

  return new LocationEntry({
    addressNumber,
    addressStreet,
    x,
    y,
    lat,
    long
  });
};

module.exports = LocationEntry;
