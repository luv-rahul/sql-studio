const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

router.post("/problems/create", assignmentController.createAssignment);
router.get("/problems/all", assignmentController.getAllAssigment);
router.get("/:id", assignmentController.getAssignmentById);

module.exports = router;
