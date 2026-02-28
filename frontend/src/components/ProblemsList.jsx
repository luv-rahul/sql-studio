import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../slice/appSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ProblemsList = () => {
  const [problemsList, setProblemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const { showSideBar } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/assignment/problems/all`);
        const json = await response.json();
        setProblemsList(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="problems-list-container">
        <div className="container-title">Assignments</div>
        <div className="loading">Loading problems...</div>
      </div>
    );
  }

  return (
    <div
      className={`problems-list-container ${showSideBar ? "open" : "closed"}`}
    >
      <div className="container-title">
        <h3 className="header">Assignment Questions</h3>
        <span
          onClick={() => dispatch(toggleSideBar())}
          className="material-symbols-outlined close"
          role="button"
        >
          close_small
        </span>
      </div>

      {problemsList?.map((problem) => (
        <Link
          to={`/assignment/practice/${problem._id}/${problem.slug}`}
          key={problem?._id}
        >
          <div
            className={`problems-list-item ${
              selectedId === problem?._id ? "active" : ""
            }`}
            onClick={() => setSelectedId(problem?._id)}
          >
            <div className="title">{problem?.title}</div>

            <div
              className={`difficulty ${
                problem?.difficulty ? problem.difficulty.toLowerCase() : ""
              }`}
            >
              {problem?.difficulty}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProblemsList;
