const Result = () => {
  const status = "error";

  return (
    <div className="result-container">
      <div className="result-header">
        <div className="result-title">
          <span
            className={`material-symbols-outlined ${
              status === "success" ? "result-icon" : "error-icon"
            }`}
          >
            {status === "success" ? "check_circle" : "error"}
          </span>
          <span> {status === "success" ? "Result" : "Error"}</span>
        </div>
      </div>

      <div className="result-body">
        <div className="status success">✔ Query executed successfully</div>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>product_id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
              </tr>
              <tr>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
