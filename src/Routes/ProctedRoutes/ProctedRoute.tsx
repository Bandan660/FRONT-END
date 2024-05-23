import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

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

  if (adminRoute && !isAdmin) return <div><h1 className="text-center">Geide gopi jatara dekhi, sabu mahalia darkar tote chhudipua</h1></div>

  return children ? children : <Outlet/>;
};

export default ProctedRoute;
