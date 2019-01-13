const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

// GET - READ
router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: "The projects could not be retrieved." });
    });
});

// GET - Read with specific ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project with the specified ID does not exist." });
    });
});

// POST - CREATE
router.post("/", (req, res) => {
  const project = req.body;

  if (!project.name || !project.description) {
    res
      .status(400)
      .json({ error: "Please provide name and a description for the project" });
  } else if (project.name.length > 128) {
    res
      .status(400)
      .json({ error: "Please provide a name that is under 129 characters." });
  } else {
    db.insert(project)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the project to the database."
        });
      });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(project => {
      if (project) {
        db.remove(id).then(count => {
          res.status(200).json(project);
        });
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The project could not be removed." });
    });
});

// PUT - Update
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.get(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
      if (!changes.name || !changes.description) {
        res.status(400).json({
          error: "Please provide name and a description for the project"
        });
      }
      if (changes.name.length > 128) {
        res.status(400).json({
          error: "Please provide a name that is under 129 characters."
        });
      }
      db.update(id, changes).then(result => {
        res.status(200).json({ result });
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project information could not be modified" });
    });
});

module.exports = router;
