import React, { Fragment, Suspense } from "react";
import Routing from "./Routes/routes";
import Header from "./Components/Shared/Header";
import { useLocation } from "react-router-dom";
import Footer from "./Components/Shared/Footer";
import Loader from "./Components/Loader";

const App = () => {
  const navigate = useLocation();

  const isAdminRoute = () => {
    return navigate.pathname.startsWith("/admin");
  };

  return (
    <Fragment>
      <Suspense fallback={<Loader/>}>
      <div className="page-wraper">
        {/* Header component start */}
        {isAdminRoute() ? null : <Header />}

        {/* Header component end */}

        {/* All routes start from here  */}
        <Routing />
        {/* All routes end here  */}
        {isAdminRoute() ? null : <Footer />}
      </div>

      </Suspense>
     
    </Fragment>
  );
};

export default App;
