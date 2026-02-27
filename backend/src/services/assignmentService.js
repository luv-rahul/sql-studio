const mongoose = require("mongoose");
const Assignment = require("../models/assignment");

const createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData);
  return await assignment.save();
};

const getAllAssigment = async () => {
  return await Assignment.find({});
};

const getAssignmentById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Assignment ID" + id);
  }
  return await Assignment.findById(id);
};

module.exports = { createAssignment, getAllAssigment, getAssignmentById };
