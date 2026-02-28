import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    setIsLogin(true);
    navigate("/auth");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? <Login /> : <Signup onSignupSuccess={handleSignupSuccess} />}

        <div className="auth-toggle">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
