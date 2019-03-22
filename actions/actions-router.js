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

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ error: "The action with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The action with the specified ID could not be retrieved."
      });
    });
});

router.post("/", (req, res) => {
  const action = req.body;

  if (!action.project_id) {
    res.status(400).json({
      error: "Please provide a project id for the action"
    });
  } else if (!action.description) {
    res.status(400).json({
      error: "Please provide a description for the action"
    });
  } else if (!action.notes) {
    res.status(400).json({
      error: "Please provide notes for the action"
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
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the action to the database."
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.get(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      }
      if (!changes.project_id) {
        res.status(400).json({
          error: "Please provide a project id for the action"
        });
      } else if (!changes.description) {
        res.status(400).json({
          error: "Please provide a description for the action"
        });
      } else if (!changes.notes) {
        res.status(400).json({
          error: "Please provide notes for the action"
        });
      } else if (changes.description.length > 128) {
        res.status(400).json({
          error: "Please provide a description that is under 129 characters."
        });
      }
      db.update(id, changes)
        .then(result => {
          res.status(200).json({ result });
        })
        .catch(error => {
          res.status(500).json({
            error: "The action information could not be modified"
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        error: "The action with the specified ID could not be retrieved."
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          error: "The action with the specified ID does not exist."
        });
      } else {
        db.remove(id).then(deleted => {
          res.status(200).json(action);
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The action could not be removed." });
    });
});

module.exports = router;
