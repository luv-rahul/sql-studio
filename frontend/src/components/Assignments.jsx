import { useNavigate } from "react-router-dom";
import { assignments } from "../utils/constants";

const Assignments = () => {
  const navigate = useNavigate();

  return (
    <div className="assignment-container">
      <p>
        <span className="material-symbols-outlined header-icon">task</span> Your Task
      </p>
      <div className="assignment-container-header">
        <h1>Assignment</h1>
        <div className="search">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search Question"></input>
        </div>
      </div>
      <p>{assignments.length} problems to conquer</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="material-symbols-outlined header-icon question-icon">
                text_ad
              </span>
              Question
            </th>
            <th>
              <span className="material-symbols-outlined header-icon difficulty-icon">
                build
              </span>
              Difficulty
            </th>
            <th>
              <span className="material-symbols-outlined header-icon deadline-icon">
                calendar_today
              </span>
              Deadline
            </th>
            <th>
              <span className="material-symbols-outlined header-icon status-icon">
                done_all
              </span>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr
              key={assignment._id}
              onClick={() =>
                navigate(
                  `/assignment/practice/${assignment._id}/${assignment.slug}`,
                )
              }
              className="clickable-row"
            >
              <td>{index + 1}</td>
              <td>{assignment.title}</td>
              <td
                className={`assignment-difficulty ${assignment.difficulty.toLowerCase()}`}
              >
                {assignment.difficulty}
              </td>
              <td>{assignment.createdAt.split("T")[0]}</td>
              <td id="assignment-status">Pending</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
