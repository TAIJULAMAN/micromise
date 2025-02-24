/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage?.getItem("accessToken");
    setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  }

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;
