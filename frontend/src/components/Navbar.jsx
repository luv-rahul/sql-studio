import logo from "../assets/logo.png";
import { AVATAR_URL } from "../utils/constants";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="logo-header">SQL Studio</h1>
      </div>

      <div className="btn-container">
        <div className="run-btn btn">
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
