import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // const auth = true;
  const [auth, setauth] = useState(true);
  useEffect(() => {
    setauth(true);
  }, []);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
