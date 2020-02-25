const express = require("express");
const dbActions = require("../data/helpers/actionModel");

const router = express.Router();
router.use(express.json());

// POST > Creates a project using the information sent inside the request Body
router.post("/actions", (req, res) => {
  const body = req.body;

  dbActions
    .insert(body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to insert new Project" });
    });
});

// GET > Returns an array of all the project objects contained in the database.
router.get("/actions", (req, res) => {
  dbActions
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ error: "Could not retrieve projects" });
    });
});

// GET > Returns the post object with the specified id.
router.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  dbActions
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: `Could not retrieve project at id ${id}.` });
    });
});

// PUT > Updates the project with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  dbActions
    .update(id, changes)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else res.status(400).json({ error: "Nothing updated." });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: `Unable to update user ${id}.` });
    });
});

// DELETE > Removes the post with the specified id and returns the deleted post object.
router.delete("/actions/:id", (req, res) => {
  const { id } = req.params;

  dbActions
    .get(id)
    .then(project => {
      dbProject
        .remove(id)
        .then(del => {
          if (del === 1) {
            res.status(200).json(project);
          } else res.status(400).json({ error: "Nothing deleted." });
        })
        .catch(error => {
          res.status(500).json({ error: `Unable to delete project ${id}. ` });
        });
    })
    .catch(error => {
      res.status(500).json({ error: "Massive server error. Good-bye." });
    });
});

module.exports = router;
