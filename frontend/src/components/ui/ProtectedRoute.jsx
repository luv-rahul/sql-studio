import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { addUser } from "../../slice/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user) {
    dispatch(addUser(user));
  }

  if (!user || !storedToken) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
