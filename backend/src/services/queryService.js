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

const runQuery = async ({ query, userId }) => {
  const client = await pool.connect();

  try {
    if (!query || !userId) {
      throw new Error("Query and userId required");
    }

    const schemaName = `workspace_${userId}`.toLowerCase();

    if (!isSafeIdentifier(schemaName)) {
      throw new Error("Invalid schema");
    }

    const trimmedQuery = query.trim();

    if (!/^SELECT\b/i.test(trimmedQuery)) {
      throw new Error("Only SELECT queries allowed");
    }

    // Set search_path at session level (not LOCAL) so it persists for the query
    await client.query(`SET search_path TO "${schemaName}"`);

    const result = await client.query(query);

    return {
      success: true,
      columns: result.fields.map((f) => f.name),
      rows: result.rows,
    };
  } catch (error) {
    throw error;
  } finally {
    // Reset search_path before returning client to pool
    await client.query(`SET search_path TO public`);
    client.release();
  }
};

module.exports = {
  createWorkspace,
  runQuery,
};
