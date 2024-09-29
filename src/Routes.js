import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import { Restaurant } from "./Components/Restaurant";

const Routes = () => {
  // Routing between the Homepage and the Restaurant Page.
  // Restaraunt Page is accessible only if a valid restaraunt ID is passed.

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/restaurants/:restarauntId" component={Restaurant} />
        <Route exact path="/restaurants/">
          <h3 className="restaurant-error">
            No Restaurant Found ! Way back home is <Link to="/">Here !</Link>{" "}
          </h3>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
