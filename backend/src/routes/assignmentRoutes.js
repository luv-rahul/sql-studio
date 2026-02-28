const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const { userAuth } = require("../middleware/userAuth");

router.post(
  "/problems/create",
  userAuth,
  assignmentController.createAssignment,
);
router.get("/problems/all", userAuth, assignmentController.getAllAssigment);
router.get("/:id", userAuth, assignmentController.getAssignmentById);

module.exports = router;
