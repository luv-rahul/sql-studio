const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/userAuth");
const userAssignmentController = require("../controllers/userAssignmentController");

router.get(
  "/open/:assignmentId",
  userAuth,
  userAssignmentController.openAssignment,
);

router.post(
  "/submit/:assignmentId",
  userAuth,
  userAssignmentController.submitAssignment,
);

router.get("/my-progress", userAuth, userAssignmentController.getMyProgress);

module.exports = router;
