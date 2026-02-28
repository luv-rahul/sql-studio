import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedAssignmentId } from "../slice/appSlice";
import { BASE_URL } from "../utils/constants";

const Description = () => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = 123;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProblemStatement = async () => {
      try {
        const response = await fetch(`${BASE_URL}/assignment/${id}`);
        const data = await response.json();
        setAssignment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProblemStatement();
  }, [id]);

  useEffect(() => {
    if (!assignment?._id) return;

    const loadQueryData = async () => {
      try {
        await fetch(`${BASE_URL}/query/start-assignment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            assignmentId: assignment._id,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadQueryData();
  }, [assignment, userId]);

  if (loading) {
    return <div className="loading">Loading Assignment...</div>;
  }

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  dispatch(setSelectedAssignmentId(assignment._id));

  return (
    <div className="problem-content">
      <div className="title">
        <h1>{assignment.title}</h1>
      </div>

      <div className="tags">
        <span className={`tag ${assignment.difficulty}`}>
          {assignment.difficulty}
        </span>

        {assignment.tags?.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="breif-description">
        <p>{assignment.description}</p>
        {assignment.examples.map((example, index) => (
          <div key={index}>
            <h3>Given Input:</h3>
            {example?.inputTables?.map((table, tableIndex) => (
              <div key={table._id || tableIndex}>
                <h4>Table: {table.name}</h4>
                <div className="table-box">
                  <table>
                    <thead>
                      <tr>
                        {table.columns.map((col) => (
                          <th key={col._id}>{col.name}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            <h3>Expected Output:</h3>
            <div className="table-box">
              <table>
                <thead>
                  <tr>
                    {example?.expectedOutput?.columns.map((col, index) => (
                      <th key={index}>{col}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {example?.expectedOutput?.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <p>
          <strong>Constraints: {assignment.constraints}</strong>
        </p>
      </div>
    </div>
  );
};

export default Description;
