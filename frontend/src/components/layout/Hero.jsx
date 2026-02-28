import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">SQL Studio</h1>
          <p className="hero-subtitle">
            Master SQL with real-world practice problems
          </p>
          <Link to="/assignment/practice">
            <button className="hero-btn">Start Practicing</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
