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
        res.status(500).json({ error: "The actions could be retrieved."})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({ error: "The action with the specified ID does not exist." })
    })
})


module.exports = router;