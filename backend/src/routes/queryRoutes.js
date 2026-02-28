const express = require("express");
const router = express.Router();
const queryController = require("../controllers/queryController");
const { userAuth } = require("../middleware/userAuth");

router.post("/start-assignment", userAuth, queryController.postQuery);
router.post("/execute-query", userAuth, queryController.executeQuery);
router.post("/query-hints", userAuth, queryController.gptHints);

module.exports = router;
