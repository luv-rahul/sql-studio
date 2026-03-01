const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, 
  enumValues: { type: [String], default: [] },
  isPrimaryKey: { type: Boolean, default: false },
});

const TableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  columns: [ColumnSchema],
  rows: { type: [[mongoose.Schema.Types.Mixed]], default: [] },
});

const OutputSchema = new mongoose.Schema({
  columns: [{ type: String }],
  rows: { type: [[mongoose.Schema.Types.Mixed]], default: [] },
});


const TestCaseSchema = new mongoose.Schema({
  inputTables: [TableSchema],
  expectedOutput: OutputSchema,
  isHidden: { type: Boolean, default: false },
});

const AssignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, 
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    description: { type: String, required: true },
    constraints: { type: String }, 
    explanation: { type: String },
    tags: [{ type: String }], 
    examples: [TestCaseSchema],
    hiddenTestCases: [TestCaseSchema], 

    acceptanceRate: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 },
    totalAccepted: { type: Number, default: 0 },
    order: { type: Number }, 
  },
  { timestamps: true },
);

module.exports = mongoose.model("Assignment", AssignmentSchema);
