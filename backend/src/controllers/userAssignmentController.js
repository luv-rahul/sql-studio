const UserAssignmentService = require("../services/userAssignmentService");
const queryService = require("../services/queryService");

const openAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const record = await UserAssignmentService.getOrCreate(
      req.user._id,
      assignmentId,
    );

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { sqlQuery } = req.body;

    const { correct } = await queryService.runQuery({
      query: sqlQuery,
      userId: req.user._id,
      assignmentId,
    });

    const record = await UserAssignmentService.submitQuery(
      req.user._id,
      assignmentId,
      sqlQuery,
      correct,
    );

    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getMyProgress = async (req, res) => {
  try {
    const progress = await UserAssignmentService.getUserProgress(req.user._id);

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { openAssignment, submitAssignment, getMyProgress };
