import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface props {
  isAuthnticated: boolean;
  children?: ReactElement;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
}

const ProctedRoute = ({
  isAuthnticated,
  children,
  adminRoute,
  isAdmin,
  redirect = "/",
}: props) => {
  if (!isAuthnticated) return <Navigate to={redirect} />;

  return children;
};

export default ProctedRoute;
