import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../Components/Loader";

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

  if (adminRoute && !isAdmin) return <Loader/>

  return children ? children : <Outlet/>;
};

export default ProctedRoute;
