import { Navigate, Outlet } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../utils/auth";
import paths from "../utils/paths";

const AdminRoute = () => {
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to={paths.QUIZZES} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
