import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedAssignment,
  setSelectedAssignmentId,
} from "../slice/appSlice";
import { BASE_URL } from "../utils/constants";

const Description = () => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.user);
  const userId = user._id;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProblemStatement = async () => {
      try {
        const response = await fetch(`${BASE_URL}/assignment/${id}`, {
          credentials: "include",
        });
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

    dispatch(setSelectedAssignment(assignment));
    dispatch(setSelectedAssignmentId(assignment._id));

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
          credentials: "include",
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadQueryData();
  }, [assignment, dispatch, userId]);

  if (loading) {
    return <div className="loading">Loading Assignment...</div>;
  }

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

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
