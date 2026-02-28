import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { addUser } from "../slice/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  dispatch(addUser(user));

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
