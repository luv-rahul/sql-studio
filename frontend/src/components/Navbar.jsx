import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { AVATAR_URL } from "../utils/constants";
import { setQueryResult, toggleSideBar } from "../slice/appSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const queryValue = useSelector((state) => state.app.queryValue);
  const dispatch = useDispatch();
  console.log(queryValue);
  const userId = 123;

  const handleRun = async () => {
    if (!queryValue || !queryValue.trim()) {
      alert("Please write a query before running.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:4000/query/execute-query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: queryValue,
            userId,
          }),
        },
      );
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
        <div className="run-btn btn" onClick={handleRun}>
          <span className="material-symbols-outlined">play_arrow</span>
        </div>

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
