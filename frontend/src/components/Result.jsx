const Result = ({ data, status }) => {
  const isSuccess = status === "success";

  if (!data || !status) {
    return (
      <div style={{ width: "50vw", padding: "20px" }}>Run Query First!!</div>
    );
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <div className="result-title">
          <span
            className={`material-symbols-outlined ${
              isSuccess ? "result-icon" : "error-icon"
            }`}
          >
            {isSuccess ? "check_circle" : "error"}
          </span>
          <span> {isSuccess ? "Result" : "Error"}</span>
        </div>
      </div>

      <div className="result-body">
        <div className={`status ${isSuccess ? "success" : "error"}`}>
          {isSuccess ? "✔ Query executed successfully" : "❌ Query failed"}
        </div>

        {isSuccess && data?.columns && data?.rows && (
          <div className="table-box">
            <table>
              <thead>
                <tr>
                  {data.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx}>
                    {data.columns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isSuccess && data?.error && (
          <div className="error-message">{data.error}</div>
        )}
      </div>
    </div>
  );
};

export default Result;
