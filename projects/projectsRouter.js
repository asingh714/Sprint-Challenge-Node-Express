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
        res.status(500).json({ error: "The projects could not be retreived."})
    })
})

// GET - Read with specific ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "The project with the specified ID does not exist."})
    })
})



module.exports = router;
