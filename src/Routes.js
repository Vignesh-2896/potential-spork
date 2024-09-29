import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import App from "./App";
import { Restaurant } from "./Components/Restaurant";

const AppRoutes = () => {
  // Routing between the Homepage and the Restaurant Page.
  // Restaraunt Page is accessible only if a valid restaraunt ID is passed.

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/restaurants/:restarauntId" element={<Restaurant />} />
        <Route
          exact
          path="/restaurants/"
          errorElement={
            <h3 className="restaurant-error">
              No Restaurant Found ! Way back home is <Link to="/">Here !</Link>{" "}
            </h3>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
