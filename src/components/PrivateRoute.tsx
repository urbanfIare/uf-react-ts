import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import { authService } from "../services/authService";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Redux store의 상태와 localStorage의 상태를 모두 확인
  const hasToken = authService.getToken();
  const hasUser = authService.getCurrentUser();
  const isActuallyAuthenticated = isAuthenticated || (hasToken && hasUser);

  if (!isActuallyAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
