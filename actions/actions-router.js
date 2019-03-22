const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "The actions could not be retrieved." });
    });
});




module.exports = router;