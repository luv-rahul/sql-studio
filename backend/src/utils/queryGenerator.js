export const generateGPTQuery = (question, queryValue) => {
  const problemDescription = question.description;

  const examples = question.examples
    .map((example, index) => {
      const inputTables =
        example.inputTables && example.inputTables.length > 0
          ? example.inputTables
              .map(
                (table) => `
      Table: ${table.name}
      Columns: ${table.columns ? table.columns.map((col) => `${col.name} (${col.type})`).join(", ") : "N/A"}
      Rows: ${example.rows ? example.rows.map((row) => `(${row.join(", ")})`).join(", ") : "N/A"}
    `,
              )
              .join("\n")
          : "No input tables available";

      const expectedOutput =
        example.expectedOutput &&
        example.expectedOutput.rows &&
        example.expectedOutput.rows.length > 0
          ? example.expectedOutput.rows
              .map((row) => `(${row.join(", ")})`)
              .join(", ")
          : "No expected output available";

      return `
      Example ${index + 1}:
      Input Tables:
      ${inputTables}
      
      Expected Output:
      ${expectedOutput}
    `;
    })
    .join("\n\n");

  const gptQuery = `
    Act as a SQL mentor. Here is a problem:
    Problem Description: ${problemDescription}
    My Query: ${queryValue}
    Examples:
    ${examples}

    Only give me small hints (if required i.e. my query won't get me result) else appreciate me in 3 lines on how to solve this, focusing on the approach. Don't provide the full solution, just guide me with some SQL strategies or suggestions.
  `;

  return gptQuery;
};
