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
router.get("/projects/", async, (req, res) => {
    try{
        const data = await dbProject.get()
        res.status(200).json(data);
    } catch(error){
        next(error)
    };
});

// GET > Returns the post object with the specified id.
// router.get("/projects/:id", validateProjectId, (req, res) => {
//   const { id } = req.params;
//   dbProject
//     .get(id)
//     .then(project => {
//       res.status(200).json(project);
//     })
//     .catch(error => {
//       console.log(error);
//       res
//         .status(500)
//         .json({ error: `Could not retrieve project at id ${id}.` });
//     });
// });

router.get("/projects/:id", async, validateProjectId, (req, res) => {
    const { id } = req.params;
        try {
            const data = await dbProject.get(id)
            res.status(200).json(data);
        } catch(error){
            next(err)
        }    
  });

router.get("/projects:id/actions", async, validateProjectId, (req, res) => {
  const { id } = req.params;

  try {
      const data = await dbProject.getProjectActions(id)
      res.status(200).json({ data });
  } catch(error){
      next(error)
  }
});

// PUT > Updates the project with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/projects/:id", validateProjectId, (req, res) => {
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
router.delete("/projects/:id", validateProjectId, (req, res) => {
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

// Custom Middleware
function validateProjectId(req, res, next) {
  const { id } = req.params;

  dbProject
    .get(id)
    .then(project => {
      req.project = project;
      next();
    })
    .catch(error => {
      res.status(400).json({ message: "Invalid project id." });
    });
}

module.exports = router;
