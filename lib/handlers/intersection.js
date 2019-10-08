const express = require("express");

module.exports = function({ data }) {
  const router = new express.Router();

  router.get("/", (req, res) => {
    res.status(200).send({});
  });

  return router;
};
