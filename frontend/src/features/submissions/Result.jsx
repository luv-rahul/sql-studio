const Result = ({ data }) => {
  if (!data) {
    return (
      <div style={{ width: "50vw", padding: "20px" }}>Run Query First!!</div>
    );
  }

  if (!data.success) {
    return (
      <div className="result-container">
        <div className="result-header">
          <span className="material-symbols-outlined error-icon">error</span>
          <span>Error</span>
        </div>
        <div className="error-message">{data.error}</div>
      </div>
    );
  }

  const { correct, result } = data;
  const { actual, expected } = result;

  const renderTable = (tableData, title) => (
    <div className="table-section">
      <h3>{title}</h3>
      <div className="table-box">
        <table>
          <thead>
            <tr>
              {tableData.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="result-container">
      <div className="result-header">
        <span
          className={`material-symbols-outlined ${
            correct ? "result-icon" : "error-icon"
          }`}
        >
          {correct ? "check_circle" : "cancel"}
        </span>
        <span>{correct ? "Correct Answer" : "Wrong Answer"}</span>
      </div>

      <div className={`status ${correct ? "success" : "error"}`}>
        {correct
          ? "✔ All test cases passed"
          : "❌ Output does not match expected result"}
      </div>

      {renderTable(actual, "Your Output")}
      {!correct && renderTable(expected, "Expected Output")}
    </div>
  );
};

export default Result;
