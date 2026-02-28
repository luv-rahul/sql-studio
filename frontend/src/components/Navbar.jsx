import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { AVATAR_URL } from "../utils/constants";
import { setQueryResult, toggleSideBar } from "../slice/appSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const { queryValue, selectedAssignmentId } = useSelector(
    (store) => store.app,
  );
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const userId = user?.user._id;
  const isRunDisabled = !queryValue?.trim() || !selectedAssignmentId;

  const handleRun = async () => {
    if (!queryValue || !queryValue.trim()) {
      alert("Please write a query before running.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/query/execute-query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryValue,
          userId,
          assignmentId: selectedAssignmentId,
        }),
      });
      const data = await response.json();
      dispatch(setQueryResult(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <Link to="/">
          <h1 className="logo-header">SQL Studio</h1>
        </Link>
        <span
          onClick={() => dispatch(toggleSideBar())}
          className="material-symbols-outlined sidebar-btn"
        >
          open_in_new
        </span>
      </div>

      <div className="btn-container">
        <button
          className={`run-btn btn ${isRunDisabled ? "disabled" : ""}`}
          onClick={handleRun}
          disabled={isRunDisabled}
        >
          <span className="material-symbols-outlined">play_arrow</span>
        </button>

        <div className="submit-btn btn">
          <span className="material-symbols-outlined">cloud_upload</span>
          Submit
        </div>
      </div>

      <div className="avatar">
        <img className="avatar-image" src={AVATAR_URL} alt="avatar" />
      </div>
    </div>
  );
};

export default Navbar;
