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

router.post("/", (req, res) => {
  const project = req.body;

  if (!project.name) {
    res.status(400).json({
      error: "Please provide a name for the project"
    });
  } else if (!project.description) {
    res.status(400).json({
      error: "Please provide a description for the project"
    });
  } else {
    db.insert(project)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the project to the database."
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.get(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
      if (!changes.name) {
        res.status(400).json({
          error: "Please provide a name for the project"
        });
      } else if (!changes.description) {
        res.status(400).json({
          error: "Please provide a description for the project"
        });
      } else if (changes.name.length > 128) {
        res.status(400).json({
          error: "Please provide a name that is under 129 characters."
        });
      }
      db.update(id, changes)
        .then(result => {
          res.status(200).json({ result });
        })
        .catch(error => {
          res.status(500).json({
            error: "The project information could not be modified"
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        error: "The project with the specified ID could not be retrieved."
      });
    });
});

module.exports = router;
