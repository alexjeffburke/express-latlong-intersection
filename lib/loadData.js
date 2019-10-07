const fs = require("fs");

const LocationEntry = require("./LocationEntry");

function parseLine(line) {
  const lineBits = line.split(",");
  if (lineBits.length !== 6) {
    throw new Error("invalid line");
  }

  const [addressNumber, addressStreet, x, y, ...coords] = lineBits;

  return [
    addressNumber,
    addressStreet,
    x,
    y,
    parseFloat(coords[0]),
    parseFloat(coords[1])
  ];
}

module.exports = function loadData(file) {
  let entries;

  try {
    fs.statSync(file);
    const lines = fs.readFileSync(file, "utf8");

    entries = lines.split("\n").map(line => {
      if (line.length > 0) {
        return LocationEntry.fromData(parseLine(line));
      } else {
        return null;
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(`unable to load data from: ${file}`);
  }

  return entries.filter(item => item !== null);
};
