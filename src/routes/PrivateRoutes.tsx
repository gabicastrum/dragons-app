import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { type ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {

  const { logado } = useAuth();

  if (!logado) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}