import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Privateroutes = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Privateroutes;
