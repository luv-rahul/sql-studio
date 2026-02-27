const express = require("express");
const router = express.Router();
const queryController = require("../controllers/queryController");

router.post("/start-assignment", queryController.postQuery);
router.post("/execute-query", queryController.executeQuery);

module.exports = router;
