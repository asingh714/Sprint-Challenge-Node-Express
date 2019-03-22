const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "The projects could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The project with the specified ID could not be retrieved."
      });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  db.getProjectActions(id)
    .then(actions => {
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({
          error: "The actions for the specified project do not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The actions of the specified project could not be retrieved."
      });
    });
});

module.exports = router;
