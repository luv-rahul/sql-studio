const mongoose = require("mongoose");

//
// Column Schema (same as before)
//
const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // INT, VARCHAR, DATE, etc.
  enumValues: { type: [String], default: [] },
  isPrimaryKey: { type: Boolean, default: false },
});

//
// Table Schema (same as before)
//
const TableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  columns: [ColumnSchema],
  rows: { type: [[mongoose.Schema.Types.Mixed]], default: [] },
});

//
// Expected Output Schema
//
const OutputSchema = new mongoose.Schema({
  columns: [{ type: String }],
  rows: { type: [[mongoose.Schema.Types.Mixed]], default: [] },
});

//
// Test Case Schema
//
const TestCaseSchema = new mongoose.Schema({
  inputTables: [TableSchema], // Tables for this test case
  expectedOutput: OutputSchema,
  isHidden: { type: Boolean, default: false }, // hidden for evaluation
});

//
// Main Assignment / Problem Schema (LeetCode Style)
//
const AssignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // URL-friendly, e.g., second-highest-salary
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    description: { type: String, required: true },
    constraints: { type: String }, // Optional constraints text
    explanation: { type: String }, // Optional solution explanation
    tags: [{ type: String }], // ["JOIN", "GROUP BY", "Subquery", "Window Function"]

    examples: [TestCaseSchema], // Visible example test cases
    hiddenTestCases: [TestCaseSchema], // Hidden evaluation test cases

    acceptanceRate: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 },
    totalAccepted: { type: Number, default: 0 },
    order: { type: Number }, // For ordering problems in platform
  },
  { timestamps: true },
);

module.exports = mongoose.model("Assignment", AssignmentSchema);
