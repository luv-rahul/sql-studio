const assignmentService = require("../services/assignmentService");

const createAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.createAssignment(req.body);
    res.status(200).send(assignment);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
};

const getAllAssigment = async (req, res) => {
  try {
    const assignments = await assignmentService.getAllAssigment();
    res.status(200).send(assignments);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(
      req.params.id,
    );
    res.status(200).send(assignment);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error}`);
  }
};

module.exports = { createAssignment, getAllAssigment, getAssignmentById };
