/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token !== undefined) {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-4 border-primary"></div>
    );
  }

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;
