const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");

// GET - READ
router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "The actions could be retrieved." });
    });
});

// GET - Read with specific ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action with the specified ID does not exist." });
    });
});

// POST - CREATE
router.post("/", (req, res) => {
  const action = req.body;

  if (!action.project_id || !action.description || !action.notes) {
    res.status(400).json({
      error: "Please provide a project ID, description and note for the action."
    });
  } else if (action.description.length > 128) {
    res.status(400).json({
      error: "Please provide a description that is under 129 characters."
    });
  } else {
    db.insert(action)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the action to the database."
        });
      });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(action => {
      if (action) {
        db.remove(id).then(count => {
          res.status(200).json(action);
        });
      } else {
        res
          .status(404)
          .json({ error: "The action with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be removed." });
    });
});

// PUT - Update
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.get(id)
    .then(action => {
      if (!action.project_id || !action.description || !action.notes) {
        res.status(400).json({
          error:
            "Please provide a project ID, description and note for the action."
        });
      }
      if (action.description.length > 128) {
        res.status(400).json({
          error: "Please provide a description that is under 129 characters."
        });
      }
      db.update(id, changes).then(result => {
        res.status(200).json({ result });
      });
    })
    .catch(err =>
      res.status(500).json({
        error: "The action information could not be modified"
      })
    );
});

module.exports = router;
