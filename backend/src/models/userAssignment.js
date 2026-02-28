const mongoose = require("mongoose");

const UserAssignmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    sqlQuery: {
      type: String,
      default: "",
    },

    lastAttempt: {
      type: Date,
      default: null,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    attemptCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

UserAssignmentSchema.index({ userId: 1, assignmentId: 1 }, { unique: true });

module.exports = mongoose.model("UserAssignment", UserAssignmentSchema);
