const express = require("express");
const dbProject = require("../data/helpers/projectModel");

const router = express.Router();
router.use(express.json());

// POST > Creates a project using the information sent inside the request Body
router.post("/projects", (req, res) => {
  const body = req.body;

  dbProject
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
router.get("/projects/", (req, res) => {
  dbProject
    .get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ error: "Could not retrieve projects" });
    });
});

// GET > Returns the post object with the specified id.
router.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  dbProject
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: `Could not retrieve project at id ${id}.` });
    });
});

router.get("/projects:id/actions", (req, res) => {
    const { id } = req.params;

    dbProject.getProjectActions(id)
        .then(project => {
            res.status(200).json({project})
        })
        .catch(error => {
            res.status(500).json({error: `Coud not retrieve project at id ${id}.` })
        })
})

// PUT > Updates the project with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  dbProject
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
router.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  dbProject
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

// X POST	/api/posts	Creates a post using the information sent inside the request body.
// POST	/api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.
// X GET	/api/posts	Returns an array of all the post objects contained in the database.
// X GET	/api/posts/:id	Returns the post object with the specified id.
// GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.
// X DELETE	/api/posts/:id	Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
// X PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
