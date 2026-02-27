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

    const schemaName = `workspace_${userId}`;

    if (!isSafeIdentifier(schemaName)) {
      throw new Error("Invalid schema name");
    }

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

          return `"${col.name}" ${colType} ${
            col.isPrimaryKey ? "PRIMARY KEY" : ""
          }`;
        })
        .join(", ");

      await client.query(
        `CREATE TABLE "${schemaName}"."${table.name}" (${columnDefs})`,
      );

      for (const row of table.rows) {
        const placeholders = row.map((_, i) => `$${i + 1}`).join(",");

        await client.query(
          `INSERT INTO "${schemaName}"."${table.name}" VALUES (${placeholders})`,
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

const runQuery = async ({ query, userId }) => {
  const client = await pool.connect();

  try {
    if (!query || !userId) {
      throw new Error("Query and userId required");
    }

    const schemaName = `workspace_${userId}`;

    if (!isSafeIdentifier(schemaName)) {
      throw new Error("Invalid schema");
    }

    const trimmedQuery = query.trim().toUpperCase();

    if (!trimmedQuery.startsWith("SELECT")) {
      throw new Error("Only SELECT queries allowed");
    }

    await client.query("BEGIN");
    await client.query(`SET LOCAL search_path TO "${schemaName}"`);

    const result = await client.query(query);

    await client.query("COMMIT");

    return {
      success: true,
      columns: result.fields.map((f) => f.name),
      rows: result.rows,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createWorkspace,
  runQuery,
};
