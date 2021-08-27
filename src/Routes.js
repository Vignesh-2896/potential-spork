import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { Restaurant } from './Components/Restaurant';

const Routes = () => {

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {App}/>
                <Route exact path = "/restaurants/:restarauntId" component = {Restaurant}/>
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;
