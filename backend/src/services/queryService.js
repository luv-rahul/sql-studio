const { pool } = require("../config/database");
const Assignment = require("../models/assignment");
const { isSafeIdentifier } = require("../utils/db.utils");

const createWorkspace = async ({ assignmentId, userId }) => {
  const client = await pool.connect();

  try {
    if (!assignmentId || !userId) {
      throw new Error("assignmentId and userId required");
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    console.log(assignment);

    const schemaName = `workspace_${userId}`.toLowerCase();

    if (!isSafeIdentifier(schemaName)) {
      throw new Error("Invalid schema name");
    }

    console.log(schemaName);

    await client.query("BEGIN");

    await client.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
    await client.query(`CREATE SCHEMA "${schemaName}"`);

    const testCase = assignment.examples[0];
    const tables = testCase.inputTables;

    for (const table of tables) {
      if (!isSafeIdentifier(table.name)) {
        throw new Error("Invalid table name");
      }

      const columnDefs = table.columns
        .map((col) => {
          if (!isSafeIdentifier(col.name)) {
            throw new Error("Invalid column name");
          }

          const colType =
            col.type.toUpperCase() === "VARCHAR" ? "VARCHAR(255)" : col.type;

          return `"${col.name.toLowerCase()}" ${colType} ${
            col.isPrimaryKey ? "PRIMARY KEY" : ""
          }`;
        })
        .join(", ");
      const tableName = table.name.toLowerCase();
      await client.query(
        `CREATE TABLE "${schemaName}"."${tableName}" (${columnDefs})`,
      );

      for (const row of table.rows) {
        const placeholders = row.map((_, i) => `$${i + 1}`).join(",");

        await client.query(
          `INSERT INTO "${schemaName}"."${tableName}" VALUES (${placeholders})`,
          row,
        );
      }
    }

    await client.query("COMMIT");

    return { success: true, message: "Workspace Ready" };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const compareResults = (actual, expected) => {
  if (!expected) return false;

  // 🔹 Normalize single value
  const normalizeValue = (val) => {
    if (val === null) return null;

    // convert numeric strings to numbers
    if (typeof val === "string" && val.trim() !== "" && !isNaN(val)) {
      return Number(val);
    }

    return val;
  };

  // 🔹 Normalize rows
  const normalizeRows = (rows) =>
    rows.map((row) => row.map((val) => normalizeValue(val)));

  // 🔹 Compare columns (order insensitive)
  const actualCols = [...actual.columns].sort();
  const expectedCols = [...expected.columns].sort();

  if (JSON.stringify(actualCols) !== JSON.stringify(expectedCols)) {
    return false;
  }

  // 🔹 Normalize + sort rows (order insensitive)
  const actualRows = normalizeRows(actual.rows)
    .map((r) => JSON.stringify(r))
    .sort();

  const expectedRows = normalizeRows(expected.rows)
    .map((r) => JSON.stringify(r))
    .sort();

  return JSON.stringify(actualRows) === JSON.stringify(expectedRows);
};

const runQuery = async ({ query, userId, assignmentId }) => {
  const client = await pool.connect();

  try {
    if (!query || !userId || !assignmentId) {
      throw new Error("Query, userId and assignmentId required");
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    const schemaName = `workspace_${userId}`.toLowerCase();

    if (!isSafeIdentifier(schemaName)) {
      throw new Error("Invalid schema");
    }

    const trimmedQuery = query.trim();

    if (!/^SELECT\b/i.test(trimmedQuery)) {
      throw new Error("Only SELECT queries allowed");
    }

    await client.query(`SET search_path TO "${schemaName}"`);

    const result = await client.query(trimmedQuery);

    const actual = {
      columns: result.fields.map((f) => f.name),
      rows: result.rows.map((row) => Object.values(row)),
    };

    const expected = assignment.examples[0].expectedOutput;

    const isCorrect = compareResults(actual, expected);

    return {
      success: true,
      correct: isCorrect,
      result: {
        expected,
        actual,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  } finally {
    await client.query(`SET search_path TO public`);
    client.release();
  }
};

module.exports = {
  createWorkspace,
  runQuery,
};
