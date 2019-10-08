const express = require("express");

const LocationEntry = require("../LocationEntry");

module.exports = function({ intersector }) {
  const router = new express.Router();

  router.get("/", (req, res, next) => {
    try {
      const location = LocationEntry.fromObject(req.query);

      const result = intersector.findNearestLocation(location);

      res.status(200).send(result);
    } catch (e) {
      next(e);
    }
  });

  return router;
};
