const UserAssignment = require("../models/userAssignment");

const getOrCreate = async (userId, assignmentId) => {
  let record = await UserAssignment.findOne({
    userId,
    assignmentId,
  });

  if (!record) {
    record = await UserAssignment.create({
      userId,
      assignmentId,
    });
  }

  return record;
};

const submitQuery = async (userId, assignmentId, sqlQuery, correct) => {
  const update = {
    sqlQuery,
    lastAttempt: new Date(),
    isCompleted: correct,
  };

  const record = await UserAssignment.findOneAndUpdate(
    { userId, assignmentId },
    {
      $set: update,
      $inc: { attemptCount: 1 },
    },
    { new: true, upsert: true },
  );

  return record;
};

const getUserProgress = async (userId) => {
  return await UserAssignment.find({ userId }).populate(
    "assignmentId",
    "title difficulty",
  );
};

module.exports = { getOrCreate, submitQuery, getUserProgress };
