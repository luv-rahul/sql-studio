import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/auth");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">{error.status}</h1>
        <h2 className="error-message">Oops! {error.statusText}</h2>
        <p className="description">
          The page you're looking for might have been moved or doesn't exist.
        </p>
        <button className="go-home-button" onClick={handleGoHome}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
